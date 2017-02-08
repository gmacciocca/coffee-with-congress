import React from "react";
import { Application } from "solo-application";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import { TelTo, LinkTo } from "../../CommonUi";

export default class PostPrintDialog extends React.Component {
    constructor(...args) {
        super(...args);
        this._events = Application.roles.events;
        this._formatString = Application.roles.formatString;
        this._utils = Application.roles.utils;
        this._offs = [];
    }

    componentDidMount() {
        this._offs.push(this._events.on("cwc:keydown", this.keypressHandler.bind(this)));
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    keypressHandler(event) {
        if (!this.props.shouldShow) {
            return false;
        }
        if (event.keyCode === 27){
            event.preventDefault();
            event.stopPropagation();
            this.handleClose();
            return false;
        }
    }

    handleClose() {
        this.props.onClose();
    }

    get issueName() {
        return this.props.issue && this.props.issue.name;
    }

    get socialMessage() {
        const message = this._formatString.format(
            "dashboard/socialMessage",
            this.contactSalutationAndName,
            this.issueName
        );
        return this._formatString.encodeURIComponent(message);
    }

    get facebookShare() {
        this._formatString.encodeURIComponent("https://writetocongress.org");
        const url =
            "https://www.facebook.com/dialog/feed?" +
            "app_id=260827994350243" +
            "&display=popup" +
            "&link=" + this._formatString.encodeURIComponent("https://writetocongress.org") +
            "&description=" + this.socialMessage;
        return (
            <LinkTo url={url}>
                <img className="dashboard__social-logo" src="./images/fb-logo.png" />
            </LinkTo>
        );
    }

    get twitterShare() {
        return (
            <LinkTo url={`https://twitter.com/home?status=${this.socialMessage}`}>
                <img className="dashboard__social-logo" src="./images/tw-logo.png" />
            </LinkTo>
        );
    }

    get shareOnSocials() {
        return (
            <div>
                <div className="dashboard__paragraph-title">{Application.localize("dashboard/shareOnSocials")}</div>
                <div>{this.facebookShare} {this.twitterShare}</div>
            </div>
        );
    }

    get contactPhoneNumber() {
        return this.props.contactAddress &&
            Array.isArray(this.props.contactAddress.phones) &&
            this.props.contactAddress.phones.length &&
            this.props.contactAddress.phones[0];
    }

    get contactDialPhoneNumber() {
        const phone = this.contactPhoneNumber;
        const cleanedPhone = phone && phone.replace(/\(|\)|-| /g, "");
        return `+1${cleanedPhone}`;
    }

    get contactSalutationAndName() {
        const salutationForAddress = (this.props.contactAddress.salutations && this.props.contactAddress.salutations.address) || "";
        return this._utils.spaceBetween(salutationForAddress, this.props.contactAddress.name);
    }

    get phoneInstructions() {
        const contactPhone = this.contactPhoneNumber;
        if (!contactPhone) {
            return null;
        }
        const contactDialPhone = this.contactDialPhoneNumber;
        const contactName = this.contactSalutationAndName;

        const localized = this._formatString.format("dashboard/callOfficialMessage", contactName);
        const Comp = ({ text }) => (<TelTo onClick={this.props.sendCallStatistics} phone={contactDialPhone}>{text}</TelTo>);
        const message = this._formatString.formatWithComponent(localized, [
            <Comp key={contactPhone} text={contactPhone} />,
            <Comp key={"dashboard/clickHere"} text={Application.localize("dashboard/clickHere")} />
        ]);

        return (
            <div>
                <div className="dashboard__paragraph-title">{Application.localize("dashboard/callOfficialTitle")}</div>
                <div>{message}</div>
            </div>
        );
    }

    render() {
        const actions = [
            <RaisedButton
                label={Application.localize("dashboard/close")}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose.bind(this)}
                type="submit"
                className="cwc-button"
            />
        ];

        return (
            <div>
                <Dialog
                    className="dashboard__no-print"
                    titleClassName="dashboard__dialog-smaller-title dashboard__post-print-dialog-title"
                    title={Application.localize("dashboard/postPrintDialogTitle")}
                    actions={actions}
                    modal={true}
                    open={this.props.shouldShow}
                    onRequestClose={this.handleClose.bind(this)}
                    contentStyle={{ width: "100%", height: "100%" }}
                >
                    <div>
                        <div>{this.phoneInstructions}</div>
                        <br />
                        <div>{this.shareOnSocials}</div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
