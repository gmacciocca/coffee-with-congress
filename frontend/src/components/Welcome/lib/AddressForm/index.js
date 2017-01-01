import React from "react";
import { Application } from "solo-application";
import { ProgressOverlay } from "../../../CommonUi";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const STATE_INITIALS = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
    "VA", "WA", "WV", "WI", "WY", "DC"
];

const isZipValid = (zipCode) => {
    return (typeof zipCode === "string") && !isNaN(zipCode) && (zipCode.length === 5);
};

export default class AddressForm extends React.Component {
    constructor(...args) {
        super(...args);
        this._cwcServer = Application.roles.cwcServer;
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this.state = {
            disableContinueButton: true,
            disableInputs: false,
            showProgress: false,
            errorText: null,
            stateCode: "",
            zipCode: ""
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.setState({ showProgress: true });
        this.disableInputs(true);

        const address = { state: this.state.stateCode, zip: this.state.zipCode };
        const addressString = `${this.state.stateCode} ${this.state.zipCode}`;

        this._cwcServer.fetchContacts(addressString)
        .then(contacts => {
            this._userStore.set("address", { ...address });
            this._contactsStore.set("contacts", { ...contacts });
            this.props.router.push("/dashboard");
        }, (err) => {
            this.setState({ showProgress: false, errorText: err.message });
            this.disableInputs(false);
        });
    }

    onZipChange(event, zipCode) {
        zipCode = (isNaN(zipCode) || zipCode.length > 5) ? this.state.zipCode : zipCode;
        this.setState({
            zipCode,
            disableContinueButton: (!this.state.stateCode || !isZipValid(zipCode)),
            errorText: null
        });
    }

    onStateChange(event, index, stateCode) {
        this.setState({
            stateCode,
            disableContinueButton: (!stateCode || !isZipValid(this.state.zipCode)),
            errorText: null
        });
    }

    disableInputs(disableInputs) {
        this.setState({ disableInputs });
    }

    get inputZip() {
        const props = {
            style: {
                width: "110px"
            },
            inputStyle: {
                type: "number",
                maxlength: 5
            }
        };

        return (
            <div>
                <TextField
                    ref={ref => this._zip = ref}
                    {...props}
                    onChange={this.onZipChange.bind(this)}
                    autoFocus={true}
                    floatingLabelText={Application.localize("welcome/zipCodeLabel")}
                    hintText={Application.localize("welcome/zipCodeHint")}
                    disabled={this.state.disableInputs}
                    value={this.state.zipCode}
                />
            </div>
        );
    }

    get continueButton(){
        return (
            <div>
                <FlatButton
                    type="submit"
                    disabled={this.state.disableContinueButton || this.state.disableInputs}
                    label={Application.localize("welcome/continue")}
                    primary={true}
                />
            </div>
        );
    }

    get stateSelect(){
        const props = {
            style: {
                width: "110px"
            },
            autoWidth: true,
            onChange: this.onStateChange.bind(this),
            floatingLabelFixed: true,
            floatingLabelText: Application.localize("welcome/stateLabel"),
            floatingLabelStyle: {
                color: Application.configuration.colors["main-blue"]
            },
            hintText: Application.localize("welcome/stateHint"),
            value: this.state.stateCode
        };

        return (
            <SelectField ref={ref => this._state = ref} {...props} >
                {
                    STATE_INITIALS.map(state => {
                        return (
                            <MenuItem
                                key={state}
                                value={state}
                                primaryText={state}
                            />
                        );
                    })
                }
            </SelectField>
        );
    }

    get errorString() {
        return this.state.errorText ? (
            <div className="welcome__error-string">{this.state.errorText}</div>
        ) : null;
    }

    render() {
        return (
            <div className="welcome__address-form" >
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="welcome__state-zip">
                        {this.stateSelect}
                        {this.inputZip}
                    </div>
                    {this.errorString}
                    {this.continueButton}
                </form>
                <ProgressOverlay showProgress={this.state.showProgress} />
            </div>
        );
    }
}
