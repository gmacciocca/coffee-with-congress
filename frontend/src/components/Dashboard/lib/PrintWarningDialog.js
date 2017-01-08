import React from "react";
import { Application } from "solo-application";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";

export default class PrintWarningDialog extends React.Component {
    constructor(...args) {
        super(...args);
        this._events = Application.roles.events;
        this._formatString = Application.roles.formatString;
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
            this.handleCancel();
            return false;
        }
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleOk() {
        this.props.onOk(this._isDoNotShowAgaiChecked);
    }

    onDoNotShowAgaiCheck(event, isInputChecked) {
        this._isDoNotShowAgaiChecked = isInputChecked;
    }

    get stampsHtmlString() {
        return this._formatString.formatWithUrlLink(
            "dashboard/stampsInstructions",
            "dashboard/stampsLink",
            "dashboard/stampsLinkName"
        );
    }

    get envelopesHtmlString() {
        return this._formatString.formatWithUrlLink(
            "dashboard/envelopeInstructions",
            "dashboard/envelopeLink",
            "dashboard/envelopeLinkName"
        );
    }

    render() {
        const actions = [
            <RaisedButton
                label={Application.localize("dashboard/cancel")}
                primary={false}
                onTouchTap={this.handleCancel.bind(this)}
                type="button"
                className="cwc-button"
            />,
            <RaisedButton
                label={Application.localize("dashboard/print")}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOk.bind(this)}
                type="submit"
                className="cwc-button"
            />
        ];

        return (
            <div>
                <Dialog
                    title={Application.localize("dashboard/printWarningDialogTitle")}
                    actions={actions}
                    modal={true}
                    open={this.props.shouldShow}
                    onRequestClose={this.handleCancel.bind(this)}
                    contentStyle={{ width: "100%", height: "100%" }}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <h5>{Application.localize("dashboard/gotStamps")}</h5>
                        <div dangerouslySetInnerHTML={{ __html: this.stampsHtmlString }} />
                        <h5>{Application.localize("dashboard/needEnvelope")}</h5>
                        <div dangerouslySetInnerHTML={{ __html: this.envelopesHtmlString }} />
                        <h5>{Application.localize("dashboard/checkPrinter")}</h5>
                        <div>{Application.localize("dashboard/printerInstructions")}</div>
                        <h5>{Application.localize("dashboard/grabAPen")}</h5>
                    </div>
                    <Checkbox
                        onCheck={this.onDoNotShowAgaiCheck.bind(this)}
                        label={Application.localize("dashboard/doNotShowAgain")}
                    />
                </Dialog>
            </div>
        );
    }
}
