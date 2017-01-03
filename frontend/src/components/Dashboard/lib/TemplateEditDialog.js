import React from "react";
import { Application } from "solo-application";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import MessageDialog from "./MessageDialog";

export default class TemplateEditDialog extends React.Component {
    constructor(...args) {
        super(...args);
        this._events = Application.roles.events;
        this._offs = [];
        this.state = {
            openMessageDialog: false,
            messageDialogText: null,
            messageDialogTitle: null,
            onMessageDialogOk: null,
            onMessageDialogCancel: null
        };
    }

    componentDidMount() {
        this._offs.push(this._events.on("cwc:keydown", this.keypressHandler.bind(this)));
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    keypressHandler(event) {
        if (!this.props.shouldShow ||
            this.state.openMessageDialog) {
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

    handleSave() {
        this.props.onSave(this._form.elements.templateContent.value);
    }

    onMessageDialogClose() {
        this.setState({
            openMessageDialog: false,
            messageDialogText: null,
            messageDialogTitle: null,
            onMessageDialogOk: null,
            onMessageDialogCancel: null
        });
    }

    handleRestoreTemplate() {
        this.setState({
            openMessageDialog: true,
            messageDialogText: Application.localize("dashboard/restoreConfirmationText"),
            messageDialogTitle: Application.localize("dashboard/restoreConfirmationTitle"),
            onMessageDialogOk: () => {
                this.props.onRestore();
                this.onMessageDialogClose();
                this.handleCancel();
            },
            onMessageDialogCancel: () => {
                this.onMessageDialogClose();
            }
        });
    }

    onSubmit() {
        this.handleSave();
    }

    render() {
        const actions = [
            <FlatButton
                label={Application.localize("dashboard/restoreTemplate")}
                onTouchTap={this.handleRestoreTemplate.bind(this)}
                type="button"
            />,
            <FlatButton
                label={Application.localize("dashboard/cancel")}
                onTouchTap={this.handleCancel.bind(this)}
                type="button"
            />,
            <FlatButton
                label={Application.localize("dashboard/save")}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave.bind(this)}
                type="submit"
            />,
        ];

        return (
            <div>
                <Dialog
                    title={Application.localize("dashboard/templateEditDialogTitle")}
                    actions={actions}
                    modal={true}
                    open={this.props.shouldShow}
                    onRequestClose={this.handleCancel.bind(this)}
                    contentStyle={{ width: "100%", height: "100%" }}
                >
                    <form ref={ref => this._form = ref} onSubmit={this.onSubmit.bind(this)}>
                        <div>
                            <TextField
                                name="templateContent"
                                style={{ width: "100%" }}
                                hintText={Application.localize("dashboard/template")}
                                defaultValue={this.props.templateContent}
                                multiLine={true}
                                rows={30}
                                rowsMax={30}
                            />
                        </div>
                    </form>
                    <MessageDialog
                        open={this.state.openMessageDialog}
                        text={this.state.messageDialogText}
                        title={this.state.messageDialogTitle}
                        onOk={this.state.onMessageDialogOk}
                        onCancel={this.state.onMessageDialogCancel}
                        onClose={this.onMessageDialogClose.bind(this)}
                    />
                </Dialog>
            </div>
        );
    }
}
