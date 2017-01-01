import React from "react";
import { Application } from "solo-application";
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
import PrintWarningDialog from "./PrintWarningDialog";
import letterConstants from "./letterConstants";

export default class Dashboard extends React.Component {
    constructor(...args) {
        super(...args);
        this._events = Application.roles.events;
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this._cwcServer = Application.roles.cwcServer;
        this._utils = Application.roles.utils;
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
            showProgress: false,
            showAddressEditDialog: false,
            showTemplateEditDialog: false,
            showPrintWarningDialog: false
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
            if (this._utils.isNullOrUndefined(selections.contactIdSelected)) {
                // Select initial default contact
                selections.contactIdSelected =
                    (contacts.federal && contacts.federal[0] && contacts.federal[0].id) ||
                    (contacts.state && contacts.state[0] && contacts.state[0].id) ||
                    (contacts.city && contacts.city[0] && contacts.city[0].id);
            }
            this.setState({ address, contacts, ...selections });
            this.fetchIssues();
        } else {
            this.goHome();
        }
    }

    goHome() {
        this.props.router.push("/");
    }

    setLiteners() {
        this._offs.push(this._mediaEvents.onScreenResize(this.onScreenResize.bind(this)));
    }

    persistSelection(args){
        this._userStore.set("selections", { ...args });
    }

    showProgress(showProgress) {
        this.setState({ showProgress });
    }

    get isProgressShowing() {
        return this.state.showProgress;
    }

    fetchIssues() {
        this.showProgress(true);
        this._cwcServer.fetchIssues()
            .then(issues => {
                let issueIdSelected = this.state.issueIdSelected;
                if (this._utils.isNullOrUndefined(issueIdSelected)) {
                    // Select initial default issue
                    issueIdSelected = issues && issues[0] && issues[0].id;
                }
                this.setState({ issues, issueIdSelected });
                this.showProgress(false);
                this.fetchTemplatesForIssueIfNeeded(issueIdSelected);
            }, () => {
                this.showProgress(false);
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

    waitForAllPromises(promises) {
        const wrappedPromises = promises.map(promise => {
            return new Promise((resolve) => {
                promise
                .then((...args) => {
                    resolve(args);
                }, () => {
                    resolve();
                });
            });
        });
        return Promise.all(wrappedPromises);
    }

    fetchTemplatesForIssue(issueId) {
        this.showProgress(true);
        const address = this.state.address;
        const templates = {};
        const promises = ["city", "state", "federal"].map(level => {
            return this._cwcServer.fetchTemplate(issueId, address.state, level)
                .then(templatesForIssueAndState => {
                    templates[level] = templatesForIssueAndState;
                });
        });
        //return Promise.all(promises)
        return this.waitForAllPromises(promises)
            .then(() => {
                this.showProgress(false);
                return templates;
            }, () => {
                this.showProgress(false);
            });
    }

    componentDidMount() {
        this.updatePaperStyle();
        global.document.addEventListener("keydown", this.keypressHandler.bind(this));
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
        global.document.removeEventListener("keydown", this.keypressHandler.bind(this));
    }

    keypressHandler(event) {
        this._events.fire("cwc:keydown", event);
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
        let paperHeight = (letterConstants.letterHeightPx * availableWidth) / letterConstants.letterWidthPx;
        if (paperHeight <= availableHeight) {
            paperWidth = availableWidth;
        } else {
            paperHeight = availableHeight;
            paperWidth = (letterConstants.letterWidthPx * availableHeight) / letterConstants.letterHeightPx;
        }

        const paperStyle = {
            height: paperHeight,
            width: paperWidth,
            textAlign: "center",
            display: "inline-block"
        };
        this.setState({ paperStyle, availableWidth });
    }

    get currentProps() {
        const { state, zip } = this.state && this.state.address;
        const issue = this.state.issues && this.state.issues.find(issue => issue.id === this.state.issueIdSelected);
        const contact = this.findSelectedContact();

        return {
            state,
            zip,
            level: contact && contact.level,
            contactId: contact && contact.id,
            issueId: issue && issue.name,
            fetchingData: this.isProgressShowing
        };
    }

    get letterProps() {
        return {
            addressFrom: this.state.address,
            addressTo: this.findSelectedContact(),
            templateContent: this.getTempleateContent(true),
            height: this.state.paperStyle.height,
            width: this.state.paperStyle.width,
            onEditTemplate: this.onEditTemplate.bind(this),
            onEditUser: this.onEditUser.bind(this),
            ...this.currentProps
        };
    }

    findSelectedContact() {
        const { contacts, contactIdSelected } = this.state;
        if (contacts && !this._utils.isNullOrUndefined(contactIdSelected)){
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

    get customTemplateId() {
        return `customTeplate-${this.state.issueIdSelected}-${this.state.address.state}`;
    }

    get customTemplate() {
        const customTemplate = this._userStore.get(this.customTemplateId);
        return customTemplate && customTemplate.value;
    }

    set customTemplate(value) {
        if (value) {
            this._userStore.set(this.customTemplateId, { value });
        } else {
            this._userStore.remove(this.customTemplateId);
        }
    }

    fulFillTemplate(templateContent, contact, address) {
        //templateContent = templateContent.replace(/\n/g, "<br>");
        templateContent = templateContent.replace(/\[NAME_OF_REPRESENTATIVE\]/g, contact.name || "");
        templateContent = templateContent.replace(/\[NAME_OF_USER\]/g, address.name || "");
        templateContent = templateContent.replace(/\[STATE\]/g, address.state || "");
        return templateContent;
    }

    getTempleateContent(fulfillAndReplace) {
        const contact = this.findSelectedContact();
        const { address } = this.state;
        if (address && contact) {
            let templateContent =
                this.customTemplate ||
                (this.state.templates &&
                 this.state.templates[contact.level] &&
                 this.state.templates[contact.level].content);
            if (templateContent) {
                if (fulfillAndReplace) {
                    templateContent = this.fulFillTemplate(templateContent, contact, address);
                }
                return templateContent;
            }
        }
    }

    onEditTemplate() {
        this.setState({ showTemplateEditDialog: true });
    }

    onCancelTemplateEditDialog() {
        this.setState({ showTemplateEditDialog: false });
    }

    onSaveTemplateEditDialog(template) {
        this.customTemplate = template;
        this.setState({ showTemplateEditDialog: false });
    }

    onRestoreTemplateEditDialog() {
        this.customTemplate = null;
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
        if (!this._utils.isNullOrUndefined(contactIdSelected)) {
            this.persistSelection({ contactIdSelected });
            this.setState({ contactIdSelected });
        }
    }

    setSelectParentWidth(ref) {
        if (ref && this.state.componentParentWidth !== ref.offsetWidth) {
            this.setState({ componentParentWidth: ref.offsetWidth });
        }
    }

    select({ Component, props, number }) {
        return (
            <div className="dashboard__numbered-step-wrapper">
                <div className="dashboard__numbered-step-wrapper__number">
                    <NumberInCircle size="20" number={number} />
                </div>
                <div ref={this.setSelectParentWidth.bind(this)} className="dashboard__numbered-step-wrapper__select">
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

    get thirdStep() {
        return (
            <div className="dashboard__numbered-step-wrapper">
                <div className="dashboard__numbered-step-wrapper__number">
                    <NumberInCircle size="20" number={3} />
                </div>
                <div className="dashboard__numbered-step-wrapper__select">
                    <div className="dashboard__numbered-step-wrapper___text-only-step">{Application.localize("dashboard/personalizeLetter")}</div>
                </div>
            </div>
        );
    }

    get printElement() {
        return (
            <FlatButton
                onTouchTap={this.printTemplate.bind(this)}
                label={Application.localize("dashboard/print")}
            />
        );
    }

    printTemplate() {
        const { doNotShowPrintWarning } = this._userStore.get("settings") || {};
        if (!doNotShowPrintWarning) {
            this.setState({ showPrintWarningDialog: true });
        } else {
            window.print();
        }
    }

    onCancelPrintWarningDialog() {
        this.setState({ showPrintWarningDialog: false });
    }

    onOkPrintWarningDialog(doNotShowPrintWarning) {
        this.setState({ showPrintWarningDialog: false });
        this._userStore.set("settings", { doNotShowPrintWarning });
        setTimeout(() => {
            window.print();
        }, 1000);
    }

    get appBarTitleStyle() {
        return {
            cursor: "pointer"
        };
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
                        onRestore={this.onRestoreTemplateEditDialog.bind(this)}
                        templateContent={this.getTempleateContent(true)}
                    />
                    <PrintWarningDialog
                        shouldShow={this.state.showPrintWarningDialog}
                        onCancel={this.onCancelPrintWarningDialog.bind(this)}
                        onOk={this.onOkPrintWarningDialog.bind(this)}
                    />
                </div>
                <div className="dashboard__spacer-and-appbar-paper-wrapper dashboard__no-print">
                    <div ref={this.appBarPaperWrapperRef.bind(this)} className="dashboard__appbar-paper-wrapper">
                        <AppBar
                            showMenuIconButton={false}
                            title={<span style={this.appBarTitleStyle}>{Application.localize("welcome/title")}</span>}
                            iconElementRight={this.printElement}
                            onTitleTouchTap={this.goHome.bind(this)}
                        />
                        <div className="dashboard__numbered-steps">
                            {this.issuesSelect}
                            {this.contactsSelect}
                            {this.thirdStep}
                        </div>
                        <div ref={this.paperRef.bind(this)} className="dashboard__paper-wrapper">
                            <Paper style={this.state.paperStyle} zDepth={2}>
                                <Letter {...this.letterProps} />
                            </Paper>
                        </div>
                    </div>
                    <ProgressOverlay showProgress={this.state.showProgress} />
                </div>
                <div className="dashboard__print-only">
                    <Letter {...this.letterProps} forPrint={true} />
                </div>
            </div>
        );
    }
}
