import React from "react";
import { Application } from "solo-application";
import Moment from "moment";
import IssuesSelect from "./IssuesSelect";
import ContactsSelect from "./ContactsSelect";
import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import Letter from "./Letter";
import FlatButton from "material-ui/FlatButton";
import { ProgressOverlay } from "../../CommonUi";
import NumberInCircle from "./NumberInCircle";
import AddressEditDialog from "./AddressEditDialog";
import TemplateEditDialog from "./TemplateEditDialog";

const spaceBetween = (...args) => {
    const strings = [...args];
    return strings.filter(str => !!str).join(" ");
};

export default class Dashboard extends React.Component {
    constructor(...args) {
        super(...args);
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this._cwcServer = Application.roles.cwcServer;
        this._mediaEvents = Application.roles.mediaEvents;
        this.state = {
            address: null,
            issues: null,
            issueIdSelected: null,
            contacts: null,
            contactIdSelected: null,
            templates: null,
            templateIdSelected: null,
            paperStyle: {},
            showProgress: false
        };
        this._offs = [];
    }

    componentWillMount() {
        this.loadData();
        this.setLiteners();
    }

    loadData() {
        const address = this._userStore.get("address");
        const selections = this._userStore.get("selections") || {
            issueIdSelected: this.state.issueIdSelected,
            contactIdSelected: this.state.contactIdSelected,
        };
        const contacts = this._contactsStore.get("contacts");
        if (address && contacts) {
            if (!selections.contactIdSelected) {
                // Select initial default contact
                selections.contactIdSelected =
                    (contacts.federal && contacts.federal[0] && contacts.federal[0].id) ||
                    (contacts.state && contacts.state[0] && contacts.state[0].id) ||
                    (contacts.city && contacts.city[0] && contacts.city[0].id);
            }
            this.setState({ address, contacts, ...selections });
            this.fetchIssues();
        } else {
            this.props.router.push("/");
        }
    }

    setLiteners() {
        this._offs.push(this._mediaEvents.onScreenResize(this.onScreenResize.bind(this)));
    }

    persistSelection(args){
        this._userStore.set("selections", { ...args });
    }

    fetchIssues() {
        this.setState({ showProgress: true });
        this._cwcServer.fetchIssues()
            .then(issues => {
                let issueIdSelected = this.state.issueIdSelected;
                if (!issueIdSelected) {
                    // Select initial default issue
                    issueIdSelected = issues && issues[0] && issues[0].id;
                }
                this.setState({ showProgress: false, issues, issueIdSelected });
                this.fetchTemplatesForIssueIfNeeded(issueIdSelected);
            }, () => {
                this.setState({ showProgress: false });
            });
    }

    fetchTemplatesForIssueIfNeeded(issueId) {
        const mustFetchTemplates = issueId && (!this.state.templates || !this.state.templates.issueId);
        if (mustFetchTemplates) {
            return this.fetchTemplatesForIssue(issueId)
                .then(templates => {
                    this.setState({ templates });
                });
        }
    }

    fetchTemplatesForIssue(issueId) {
        this.setState({ showProgress: true });
        const address = this.state.address;
        const templates = {};
        const promises = ["city", "state", "federal"].map(level => {
            return this._cwcServer.fetchTemplate(issueId, address.state, level)
                .then(templatesForIssueAndState => {
                    templates[level] = templatesForIssueAndState;
                });
        });
        return Promise.all(promises)
            .then(() => {
                this.setState({ showProgress: false });
                return templates;
            }, () => {
                this.setState({ showProgress: false });
            });
    }

    componentDidMount() {
        this.updatePaperStyle();
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    onScreenResize() {
        this.updatePaperStyle();
    }

    paperRef(ref) {
        if (this._paperRef !== ref) {
            this._paperRef = ref;
        }
    }

    appBarPaperWrapperRef(ref) {
        if (this._appBarPaperWrapperRef !== ref) {
            this._appBarPaperWrapperRef = ref;
        }
    }

    updatePaperStyle() {
        if (!this._paperRef || !this._appBarPaperWrapperRef) {
            return;
        }

        const margin = 20;
        const availableWidth = this._appBarPaperWrapperRef.offsetWidth /* - this._paperRef.offsetLeft */ - (margin * 2);
        const availableHeight = this._appBarPaperWrapperRef.offsetHeight - this._paperRef.offsetTop - margin;

        // Letter size = 215.9 by 279.4
        // 215.9 : 279.4 = availableWidth : availableHeight
        let paperWidth = 0;
        let paperHeight = (279.4 * availableWidth) / 215.9;
        if (paperHeight <= availableHeight) {
            paperWidth = availableWidth;
        } else {
            paperHeight = availableHeight;
            paperWidth = (215.9 * availableHeight) / 279.4;
        }

        const paperStyle = {
            height: paperHeight,
            width: paperWidth,
            textAlign: "center",
            display: "inline-block",
        };
        this.setState({ paperStyle, availableWidth });
    }

    get letterProps() {
        const linesPerPage = 45;
        const width = "2159px";
        const height = "2794px";
        const fontSize = `${2794 / linesPerPage}px`;
        const lineHeight = `${2794 / linesPerPage}px`;

        //const scale = 0.3; //0.5; // (wrapperSize.width / contentSize.width);
        const scale = this.state.paperStyle.width / 2159;
        return {
            addressFrom: this.letterAddressFrom,
            addressTo: this.letterAddressTo,
            date: this.letterDate,
            body: this.letterBody,
            height: this.state.paperStyle.height,
            width: this.state.paperStyle.width,
            onEditBody: this.onEditBody.bind(this),
            onEditUser: this.onEditUser.bind(this),
            showAddressEditDialog: false,
            showTemplateEditDialog: false,
            inlineStyle: {
                width,
                height,
                fontSize,
                lineHeight,
                transform: "scale(" + scale + ")",
                transformOrigin: "0 0 0",
                fontWeight: "lighter"
            }
        };
    }

    userNameForLetter(address) {
        return address.name ?
            <span>{address.name}</span> :
            <span className="letter__replace-string">{Application.localize("dashboard/pleaseEnterYourNameHere")}</span>;
    }

    get letterAddressFrom() {
        const { address } = this.state;
        return address ? (
            <span>
                {this.userNameForLetter(address)}<br />
                {address.address}<br />
                {`${spaceBetween(address.city, address.state, address.zip)}`}
            </span>
        ) :
        null;
    }

    get letterDate() {
        var date = new Date();
        const momentDate = new Moment(date);
        return (
            <time tabIndex="0" dateTime={momentDate.toISOString().substr(0, 10)}>
                {momentDate.format("LL")}
            </time>
        );
    }

    findSelectedContact() {
        const { contacts, contactIdSelected } = this.state;
        if (contacts && (contactIdSelected !== null)){
            let contact;
            Object.keys(this.state.contacts).find(level => {
                contact = this.state.contacts[level].find(contact => contact.id === contactIdSelected);
                if (contact) {
                    contact.level = level;
                }
                return !!contact;
            });
            return contact;
        }
    }

    get letterAddressTo() {
        const contact = this.findSelectedContact();
        return contact ? (
            <span>{contact.name}<br />
                {`${spaceBetween(contact.address1, contact.address2)}`}<br />
                {`${spaceBetween(contact.city, contact.state, contact.zip_code)}`}<br />
                {`${contact.phones}`}<br />
                {`${contact.emails}`}<br />
            </span>
        ) :
        <span className="letter__replace-string">{Application.localize("dashboard/pleaseSelectARepresentative")}</span>;
    }

    get customTemplateId() {
        return `customTeplate-${this.state.issueIdSelected}-${this.state.address.state}`;
    }

    get customTemplate() {
        const customTemplate = this._userStore.get(this.customTemplateId);
        return customTemplate && customTemplate.value;
    }

    set customTemplate(value) {
        const customTemplate = this._userStore.set(this.customTemplateId, { value });
        return customTemplate && customTemplate.value;
    }

    fulFillTemplate(templateContent, contact, address) {
        templateContent = templateContent.replace(/\n/g, "<br>");
        templateContent = templateContent.replace(/\[NAME_OF_REPRESENTATIVE\]/g, contact.name || "");
        templateContent = templateContent.replace(/\[NAME_OF_USER\]/g, address.name || "");
        return templateContent;
    }

    getTempleateContent(fulfillAndReplace) {
        const contact = this.findSelectedContact();
        const { address } = this.state;
        if (address && contact && this.state.templates) {
            let templateContent = this.state.templates[contact.level].content;
            if (templateContent) {
                let originalTemplateContent = templateContent;
                templateContent = this.customTemplate || templateContent;
                if (fulfillAndReplace) {
                    templateContent = this.fulFillTemplate(templateContent, contact, address);
                    originalTemplateContent = this.fulFillTemplate(originalTemplateContent, contact, address);
                }
                return { templateContent, originalTemplateContent };
            }
        }
        return {};
    }

    get letterBody() {
        const { templateContent } = this.getTempleateContent(true);
        return templateContent ? (
            <span dangerouslySetInnerHTML={{ __html: templateContent }} />
        ) :
        <span className="letter__replace-string">{Application.localize("dashboard/pleaseSelectARepresentative")}</span>;
    }

    onEditBody() {
        this.setState({ showTemplateEditDialog: true });
    }

    onCancelTemplateEditDialog() {
        this.setState({ showTemplateEditDialog: false });
    }

    onSaveTemplateEditDialog(template) {
        this.customTemplate = template;
        this.setState({ showTemplateEditDialog: false });
    }

    onEditUser() {
        this.setState({ showAddressEditDialog: true });
    }

    onCancelAddressEditDialog() {
        this.setState({ showAddressEditDialog: false });
    }

    onSaveAddressEditDialog(address) {
        this._userStore.set("address", { ...address });
        this.setState({ showAddressEditDialog: false, address });
    }

    onIssueChange(event, index, issueIdSelected) {
        this.persistSelection({ issueIdSelected });
        this.setState({ issueIdSelected });
        this.fetchTemplatesForIssueIfNeeded(issueIdSelected);
    }

    onContactChange(event, index, contactIdSelected) {
        this.persistSelection({ contactIdSelected });
        this.setState({ contactIdSelected });
    }

    setSelectParentWidth(ref) {
        if (ref && this.state.componentParentWidth !== ref.offsetWidth) {
            this.setState({ componentParentWidth: ref.offsetWidth });
        }
    }

    select({ Component, props, number }) {
        return (
            <div className="dashboard__select-wrapper">
                <div className="dashboard__select-wrapper__number">
                    <NumberInCircle size="20" number={number} />
                </div>
                <div ref={this.setSelectParentWidth.bind(this)} className="dashboard__select-wrapper__select">
                    <Component parendWidth={this.state.componentParentWidth} {...props} />
                </div>
            </div>
        );
    }

    get issuesSelect() {
        return this.select({
            Component: IssuesSelect,
            props: {
                selectedId: this.state.issueIdSelected,
                issues: this.state.issues,
                maxWidth: this.state.availableWidth,
                onChange: this.onIssueChange.bind(this)
            },
            number: 1
        });
    }

    get contactsSelect() {
        return this.select({
            Component: ContactsSelect,
            props: {
                selectedId: this.state.contactIdSelected,
                contacts: this.state.contacts,
                maxWidth: this.state.availableWidth,
                onChange: this.onContactChange.bind(this)
            },
            number: 2
        });
    }

    get printElement() {
        return (
            <FlatButton
                onTouchTap={() => window.print()}
                label={Application.localize("dashboard/print")}
            />
        );
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="dashboard">
                <div className="dashboard__no-print">
                    <AddressEditDialog
                        shouldShow={this.state.showAddressEditDialog}
                        onCancel={this.onCancelAddressEditDialog.bind(this)}
                        onSave={this.onSaveAddressEditDialog.bind(this)}
                        address={this.state.address}
                    />
                    <TemplateEditDialog
                        shouldShow={this.state.showTemplateEditDialog}
                        onCancel={this.onCancelTemplateEditDialog.bind(this)}
                        onSave={this.onSaveTemplateEditDialog.bind(this)}
                        template={this.getTempleateContent(false).templateContent}
                    />
                </div>
                <div className="dashboard__spacer-and-appbar-paper-wrapper dashboard__no-print">
                    <div ref={this.appBarPaperWrapperRef.bind(this)} className="dashboard__appbar-paper-wrapper">
                        <AppBar
                            showMenuIconButton={false}
                            title={Application.localize("welcome/title")}
                            iconElementRight={this.printElement}
                        />
                        {this.issuesSelect}
                        {this.contactsSelect}
                        <div ref={this.paperRef.bind(this)} className="dashboard__paper-wrapper">
                            <Paper style={this.state.paperStyle} zDepth={2}>
                                    <Letter {...this.letterProps} />
                            </Paper>
                        </div>
                    </div>
                    <ProgressOverlay showProgress={this.state.showProgress} />
                </div>
                <div className="dashboard__print-only">
                    <Letter {...this.letterProps} />
                </div>
            </div>
        );
    }
}
