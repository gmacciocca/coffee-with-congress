import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
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
            name: this._form.elements.name.value,
            address: this._form.elements.address.value,
            city: this._form.elements.city.value,
            state: this._form.elements.state.value,
            zip: this._form.elements.zip.value
        };
        this.props.onSave(address);
    }

    onSubmit() {
        this.handleSave();
    }

    render() {
        const actions = [
            <FlatButton
                label={Application.localize("dashboard/cancel")}
                onTouchTap={this.handleSave.bind(this)}
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
            <Dialog
                title={Application.localize("dashboard/addressEditDialogTitle")}
                actions={actions}
                modal={true}
                open={this.props.shouldShow}
                onRequestClose={this.handleCancel.bind(this)}
                autoScrollBodyContent={true}
                contentStyle={{ width: "100%" }}
            >
                <form ref={ref => this._form = ref} onSubmit={this.onSubmit.bind(this)}>
                    <p>
                        <TextField
                            name="name"
                            style={{ width: "100%" }}
                            floatingLabelText={Application.localize("dashboard/name")}
                            defaultValue={this.props.address.name}
                        />
                    </p>
                    <p>
                        <TextField
                            name="address"
                            style={{ width: "100%" }}
                            floatingLabelText={Application.localize("dashboard/address")}
                            defaultValue={this.props.address.address}
                        />
                    </p>
                    <p>
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
                                disabled={true}
                                floatingLabelText={Application.localize("dashboard/state")}
                                defaultValue={this.props.address.state}
                            />
                        </span>
                        <span>
                            <TextField
                                name="zip"
                                style={{ width: "25%" }}
                                disabled={true}
                                floatingLabelText={Application.localize("dashboard/zip")}
                                defaultValue={this.props.address.zip}
                            />
                        </span>
                    </p>
                </form>
            </Dialog>
        );
    }
}
