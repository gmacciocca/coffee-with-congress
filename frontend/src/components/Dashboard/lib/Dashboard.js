import React from "react";
import { Application } from "solo-application";
import IssuesSelect from "./IssuesSelect";
import ContactsSelect from "./ContactsSelect";
import Paper from "material-ui/Paper";
import Letter from "./Letter";
import { ProgressOverlay } from "../../CommonUi";
import NumberInCircle from "./NumberInCircle";
import AddressEditDialog from "./AddressEditDialog";
import TemplateEditDialog from "./TemplateEditDialog";
import PrintWarningDialog from "./PrintWarningDialog";
import PostPrintDialog from "./PostPrintDialog";
import letterConstants from "./letterConstants";
import AppHeader from "./AppHeader";
import ReportAProblem from "./ReportAProblem";
import TemplateSources from "./TemplateSources";

export default class Dashboard extends React.Component {
    constructor(...args) {
        super(...args);
        this._events = Application.roles.events;
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this._cwcServer = Application.roles.cwcServer;
        this._utils = Application.roles.utils;
        this._mediaEvents = Application.roles.mediaEvents;
        this._analytics = Application.roles.analytics;

        this.state = {
            address: null,
            issuesGroups: null,
            issueIdSelected: null,
            contacts: null,
            contactIdSelected: null,
            templates: null,
            paperStyle: {},
            showProgress: false,
            showUserAddressEditDialog: false,
            showContactAddressEditDialog: false,
            showTemplateEditDialog: false,
            showPrintWarningDialog: false,
            showPostPrintDialog: false
        };
        this._offs = [];
    }

    componentWillMount() {
        this.loadData();
        this.setLiteners();
    }

    findInitialDefaultContact(contacts) {
        let contact;
        Object.keys(contacts).find(level => {
            contact = contacts[level].find(contact => contact.initialDefaultContact);
            return !!contact;
        });
        return contact;
    }

    selectDefaultContact(selections, contacts){
        if (this._utils.isNullOrUndefined(selections.contactIdSelected)) {
            const defaultContact = this.findInitialDefaultContact(contacts);
            selections.contactIdSelected = defaultContact && defaultContact.id;
        }
    }

    loadData() {
        const address = this._userStore.get("address");
        const selections = this._userStore.get("selections") || {
            issueIdSelected: this.state.issueIdSelected,
            contactIdSelected: this.state.contactIdSelected,
        };
        const contacts = this._contactsStore.get("contacts");
        if (address && contacts) {
            this.selectDefaultContact(selections, contacts);
            this.setState({ address, contacts, ...selections });
            this.fetchIssueGroups(address.state);
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

    // fetchIssues(state) {
    //     this.showProgress(true);
    //     this._cwcServer.fetchIssues(state)
    //         .then(issues => {
    //             let issueIdSelected = this.state.issueIdSelected;
    //             if (this._utils.isNullOrUndefined(issueIdSelected)) {
    //                 // Select initial default issue
    //                 issueIdSelected = issues && issues[0] && issues[0].id;
    //             }
    //             this.setState({ issues, issueIdSelected });
    //             this.showProgress(false);
    //             this.fetchTemplatesForIssueIfNeeded(issueIdSelected);
    //         }, () => {
    //             this.showProgress(false);
    //         });
    // }

    fetchIssueGroups(state) {
        this.showProgress(true);
        this._cwcServer.fetchIssueGroups(state)
            .then(issuesGroups => {
                let issueIdSelected = this.state.issueIdSelected;
                if (this._utils.isNullOrUndefined(issueIdSelected)) {
                    // Select initial default issue
                    const findFirstIssue = (issuesGroups) => {
                        const group = issuesGroups.find(group => {
                            return Array.isArray(group.issues) && group.issues.length;
                        });
                        return group && group.issues && group.issues[0] && group.issues[0].id;
                    };
                    issueIdSelected = findFirstIssue(issuesGroups);
                }
                this.setState({ issuesGroups, issueIdSelected });
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
        const promises = Application.configuration.officialLevels.map(level => {
            return this._cwcServer.fetchTemplate(issueId, address.state, level)
                .then(templatesForIssueAndState => {
                    templates[level] = templatesForIssueAndState;
                });
        });
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

    onScreenResize({ height, width }) {
        if (width > 300 && height > 400) {
            this.updatePaperStyleThrottled();
        }
    }

    updatePaperStyleThrottled() {
        if (this._updatePaperStyleTimeout){
            clearTimeout(this._updatePaperStyleTimeout);
        }
        this._updatePaperStyleTimeout = setTimeout(() => {
            this.updatePaperStyle();
        }, 100);
    }

    paperRef(ref) {
        this._paperRef = ref;
    }

    contentsRef(ref) {
        this._contentsRef = ref;
    }

    reportAProblemRef(ref) {
        this._reportAProblemRef = ref;
    }

    templateSourcesRef(ref) {
        this._templateSourcesRef = ref;
    }

    updatePaperStyle() {
        if (!this._paperRef ||
            !this._contentsRef ||
            !this._templateSourcesRef ||
            !this._reportAProblemRef){
            return;
        }

        const paperShadowWidth = 10;
        const availableWidth = this._contentsRef.offsetWidth /* - this._paperRef.offsetLeft */ - (paperShadowWidth * 2);
        const availableHeight =
            this._contentsRef.offsetHeight -
            this._paperRef.offsetTop -
            this._reportAProblemRef.offsetHeight -
            (this._templateSourcesRef ? this._templateSourcesRef.offsetHeight : 0) -
            paperShadowWidth;

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

    get currentIssue() {
        const matchingIssue = this.state.issuesGroups && this.state.issuesGroups.map(group => {
            return group.issues && group.issues.find(issue => issue.id === this.state.issueIdSelected);
        }).find(issue => issue);
        return matchingIssue;
    }

    get currentProps() {
        const { state, zip_code } = this.state && this.state.address;
        const issue = this.currentIssue;
        const contact = this.selectedContactAddress;

        return {
            state,
            zip_code,
            level: contact && contact.level,
            contactId: contact && contact.id,
            issueId: issue && issue.id,
            issueName: issue && issue.name,
            fetchingData: this.isProgressShowing
        };
    }

    get letterProps() {
        return {
            addressFrom: this.state.address,
            addressTo: this.selectedContactAddress,
            templateContent: this.getTempleateContent(true),
            height: this.state.paperStyle.height,
            width: this.state.paperStyle.width,
            onEditTemplate: this.onEditTemplate.bind(this),
            onEditUserAddress: this.onEditUserAddress.bind(this),
            onEditContactAddress: this.onEditContactAddress.bind(this),
            ...this.currentProps
        };
    }

    findContactById(id) {
        let contact;
        Object.keys(this.state.contacts).find(level => {
            contact = this.state.contacts[level].find(contact => contact.id === id);
            return !!contact;
        });
        return contact;
    }

    get selectedContactAddress() {
        const { contacts, contactIdSelected } = this.state;
        if (contacts && !this._utils.isNullOrUndefined(contactIdSelected)){
            const customContactAddress = this.customContactAddress;
            let contactAddress = this.findContactById(contactIdSelected);
            if (contactAddress && customContactAddress) {
                // If we have a custom contact address, then make a clone of the original
                // contact address, and overwrite the clone with the custom address.
                contactAddress = this._utils.cloneObject(contactAddress);
                Object.assign(contactAddress, customContactAddress);
            }
            return contactAddress;
        }
    }

    get customContactAddressId() {
        const { contactIdSelected } = this.state;
        return `customContactAddress-${contactIdSelected}`;
    }

    get customContactAddress() {
        return this._userStore.get(this.customContactAddressId);
    }

    set customContactAddress(contactAddress) {
        if (contactAddress) {
            this._userStore.set(this.customContactAddressId, { ...contactAddress });
        } else {
            this._userStore.remove(this.customContactAddressId);
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
        const salutationForTemplate = (contact.salutations && contact.salutations.template) || "";
        const contactNameForTemplate = this._utils.spaceBetween(salutationForTemplate, contact.name);
        templateContent = templateContent.replace(/\[NAME_OF_REPRESENTATIVE\]/g, contactNameForTemplate || "");
        templateContent = templateContent.replace(/\[NAME_OF_USER\]/g, address.name || "");
        templateContent = templateContent.replace(/\[STATE\]/g, address.state || "");
        return templateContent;
    }

    getTempleateContent(fulfillAndReplace) {
        const contact = this.selectedContactAddress;
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

    get templateSources() {
        const contact = this.selectedContactAddress;
        return contact &&
            this.state.templates &&
            this.state.templates[contact.level] &&
            this.state.templates[contact.level].sources;
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

    onEditUserAddress() {
        this.setState({ showUserAddressEditDialog: true });
    }

    onCancelEditUserAddress() {
        this.setState({ showUserAddressEditDialog: false });
    }

    onSaveEditUserAddress(address) {
        this._userStore.set("address", { ...address });
        this.setState({ showUserAddressEditDialog: false, address });
    }

    onEditContactAddress() {
        this.setState({ showContactAddressEditDialog: true });
    }

    onCancelEditContactAddress() {
        this.setState({ showContactAddressEditDialog: false });
    }

    onSaveEditContactAddress(address) {
        this.customContactAddress = address;
        this.setState({ showContactAddressEditDialog: false });
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

    select({ Component, props, number }) {
        return (
            <div className="dashboard__numbered-step">
                <div className="dashboard__numbered-step__number">
                    <NumberInCircle size="20" number={number} />
                </div>
                <div className="dashboard__numbered-step__select">
                    <Component {...props} />
                </div>
            </div>
        );
    }

    get issuesSelect() {
        return this.select({
            Component: IssuesSelect,
            props: {
                selectedId: this.state.issueIdSelected,
                issuesGroups: this.state.issuesGroups,
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
            <div className="dashboard__numbered-step">
                <div className="dashboard__numbered-step__number">
                    <NumberInCircle size="20" number={3} />
                </div>
                <div className="dashboard__numbered-step__select">
                    <div className="dashboard__numbered-step___text-only-step">
                        {Application.localize("dashboard/personalizeLetter")}
                        <i className="dashboard__numbered-step___text-only-step__icon material-icons"
                            onClick={this.printTemplate.bind(this)}
                        >print</i>
                    </div>
                </div>
            </div>
        );
    }

    printTemplate() {
        this.setState({ showPrintWarningDialog: true });
    }

    onClosePostPrintDialog() {
        this.setState({ showPostPrintDialog: false });
    }

    onCancelPrintWarningDialog() {
        this.setState({ showPrintWarningDialog: false });
    }

    onOkPrintWarningDialog() {
        this.setState({ showPrintWarningDialog: false });
        this.sendStatisticAndBrowserPrint();
    }

    sendStatisticAndBrowserPrint() {
        const { issueId, state, level } = this.currentProps;
        this._cwcServer.sendPrintStatistics({ issueId, state, level });
        this._analytics.sendPrintStatistics({ issueId, state, level });
        window.print();
        this.setState({ showPostPrintDialog: true });
    }

    sendCallStatistics() {
        const { issueId, state, level } = this.currentProps;
        this._analytics.sendCallStatistics({ issueId, state, level });
    }

    get addressEditDialog() {
        const contactAddress = this.selectedContactAddress;
        const props = {
            shouldShow: this.state.showUserAddressEditDialog || this.state.showContactAddressEditDialog,
            onCancel: this.state.showUserAddressEditDialog ?
                this.onCancelEditUserAddress.bind(this) : this.onCancelEditContactAddress.bind(this),
            onSave: this.state.showUserAddressEditDialog ?
                this.onSaveEditUserAddress.bind(this) : this.onSaveEditContactAddress.bind(this),
            address: this.state.showUserAddressEditDialog ? this.state.address : contactAddress,
            isUserAddress: this.state.showUserAddressEditDialog
        };
        return (
            <AddressEditDialog {...props} />
        );
    }

    get templateSourcesElement() {
        return (
            <TemplateSources
                showToggleFunc={this.updatePaperStyle.bind(this)}
                width={this.state.paperStyle.width}
                refFunc={this.templateSourcesRef.bind(this)}
                sources={this.templateSources} />
        );
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="dashboard">
                <div className="dashboard__no-print">
                    <div ref={this.contentsRef.bind(this)} className="dashboard__contents">
                        <div className="dashboard__header">
                            <AppHeader
                                router={this.props.router}
                                onPrint={this.printTemplate.bind(this)}
                            />
                        </div>
                        <div className="dashboard__numbered-steps">
                            {this.issuesSelect}
                            {this.contactsSelect}
                            {this.thirdStep}
                        </div>
                        <div ref={this.paperRef.bind(this)} className="dashboard__paper">
                            <Paper
                                style={this.state.paperStyle}
                                zDepth={2}
                                rounded={false} >
                                <Letter {...this.letterProps} />
                            </Paper>
                        </div>
                        {this.templateSourcesElement}
                         <ReportAProblem refFunc={this.reportAProblemRef.bind(this)} />
                    </div>
                    <ProgressOverlay showProgress={this.state.showProgress} />
                </div>
                <div className="dashboard__no-print">
                    {this.addressEditDialog}
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
                    <PostPrintDialog
                        issue={this.currentIssue}
                        contactAddress={this.selectedContactAddress}
                        shouldShow={this.state.showPostPrintDialog}
                        onClose={this.onClosePostPrintDialog.bind(this)}
                        sendCallStatistics={this.sendCallStatistics.bind(this)}
                    />
                </div>
                <div className="dashboard__print-only">
                    <Letter {...this.letterProps} forPrint={true} />
                </div>
            </div>
        );
    }
}
