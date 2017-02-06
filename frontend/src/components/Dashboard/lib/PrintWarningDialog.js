import React from "react";
import { Application } from "solo-application";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

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
        this.props.onOk();
    }

    get stampsInstructions() {
        return this._formatString.formatWithUrlLink(
            "dashboard/stampsInstructions",
            "dashboard/stampsLink",
            "dashboard/stampsLinkName"
        );
    }

    get envelopeInstructions() {
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
                    className="dashboard__no-print"
                    titleClassName="dashboard__dialog-smaller-title"
                    bodyClassName="dashboard__dialog-smaller-body"
                    title={Application.localize("dashboard/printWarningDialogTitle")}
                    actions={actions}
                    modal={true}
                    open={this.props.shouldShow}
                    onRequestClose={this.handleCancel.bind(this)}
                    contentStyle={{ width: "100%", height: "100%" }}
                    autoScrollBodyContent={false}
                >
                    <div>
                        <div className="dashboard__paragraph-title">{Application.localize("dashboard/gotStamps")}</div>
                        {this.stampsInstructions}
                        <div className="dashboard__paragraph-title">{Application.localize("dashboard/needEnvelope")}</div>
                        {this.envelopeInstructions}
                        <div className="dashboard__paragraph-title">{Application.localize("dashboard/checkPrinter")}</div>
                        <div>{Application.localize("dashboard/printerInstructions")}</div>
                        <div className="dashboard__paragraph-title">{Application.localize("dashboard/grabAPen")}</div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
