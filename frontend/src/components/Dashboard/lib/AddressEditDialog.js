import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Application } from "solo-application";

export default class AddressEditDialog extends React.Component {

    componentDidMount() {
        global.document.addEventListener("keydown", this.keypressHandler.bind(this));
    }

    componentWillUnmount() {
        global.document.removeEventListener("keydown", this.keypressHandler.bind(this));
    }

    keypressHandler(event) {
        if (!this.props.shouldShow) {
            return;
        }
        if (event.keyCode === 27){
            event.preventDefault();
            event.stopPropagation();
            this.handleCancel();
        } else if (event.keyCode === 13){
            this.handleSave();
        }
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleSave() {
        const address = {
            name: this._form.elements.name.value.trim(),
            address1: this._form.elements.address1.value.trim(),
            city: this._form.elements.city.value.trim(),
            state: this._form.elements.state.value.trim(),
            zip_code: this._form.elements.zip_code.value.trim()
        };
        this.props.onSave(address);
    }

    onSubmit() {
        this.handleSave();
    }

    get title() {
        return this.props.isUserAddress ?
            Application.localize("dashboard/userAddressEditDialogTitle") :
            Application.localize("dashboard/contactAddressEditDialogTitle");
    }

    render() {
        const actions = [
            <RaisedButton
                label={Application.localize("dashboard/cancel")}
                onTouchTap={this.handleSave.bind(this)}
                type="button"
                className="cwc-button"
            />,
            <RaisedButton
                label={Application.localize("dashboard/save")}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave.bind(this)}
                type="submit"
                className="cwc-button"
            />,
        ];

        return (
            <Dialog
                title={this.title}
                actions={actions}
                modal={true}
                open={this.props.shouldShow}
                onRequestClose={this.handleCancel.bind(this)}
                contentStyle={{ width: "100%" }}
            >
                <form ref={ref => this._form = ref} onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <TextField
                            name="name"
                            style={{ width: "100%" }}
                            disabled={!this.props.isUserAddress}
                            floatingLabelText={Application.localize("dashboard/name")}
                            defaultValue={this.props.address.name}
                        />
                    </div>
                    <div>
                        <TextField
                            name="address1"
                            style={{ width: "100%" }}
                            floatingLabelText={Application.localize("dashboard/address")}
                            defaultValue={this.props.address.address1}
                        />
                    </div>
                    <div>
                        <span>
                            <TextField
                                name="city"
                                style={{ width: "50%" }}
                                floatingLabelText={Application.localize("dashboard/city")}
                                defaultValue={this.props.address.city}
                            />
                        </span>
                        <span>
                            <TextField
                                name="state"
                                style={{ width: "25%" }}
                                disabled={this.props.isUserAddress}
                                floatingLabelText={Application.localize("dashboard/state")}
                                defaultValue={this.props.address.state}
                            />
                        </span>
                        <span>
                            <TextField
                                name="zip_code"
                                style={{ width: "25%" }}
                                disabled={this.props.isUserAddress}
                                floatingLabelText={Application.localize("dashboard/zip")}
                                defaultValue={this.props.address.zip_code}
                            />
                        </span>
                    </div>
                </form>
            </Dialog>
        );
    }
}
