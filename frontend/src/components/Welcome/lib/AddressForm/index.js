import React from "react";
import { Application } from "solo-application";
import { ProgressOverlay } from "../../../CommonUi";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectFieldEx from "./SelectFieldEx";
import MenuItem from "material-ui/MenuItem";
import processContacts from "../processContacts";

const STATE_INITIALS = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
    "VA", "WA", "WV", "WI", "WY", "DC"
];

const isValidZipCode = (zipCode) => {
    return !isNaN(zipCode) && zipCode.length === 5;
};

export default class AddressForm extends React.Component {
    constructor(...args) {
        super(...args);
        this._cwcServer = Application.roles.cwcServer;
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this.state = {
            disableInputs: false,
            showProgress: false,
            errorText: null,
            stateCode: "",
            zipCode: "",
            streetAddress: "",
            city: ""
        };
    }

    onSubmit(ev) {
        if (this.shouldDisableContinueButton) {
            this.setState({ errorText: Application.localize("welcome/pleaseEnterRequiredFields") });
            return;
        }
        ev.preventDefault();
        this.setState({ showProgress: true });
        this.disableInputs(true);

        const address = {
            address1: this.state.streetAddress,
            city: this.state.city,
            state: this.state.stateCode,
            zip_code: this.state.zipCode
        };

        const addressString = `${this.state.streetAddress} ${this.state.city} ${this.state.stateCode} ${this.state.zipCode}`;

        this._cwcServer.fetchContacts(addressString)
        .then(contacts => {
            contacts = processContacts(contacts);
            this._userStore.set("address", { ...address });
            this._contactsStore.set("contacts", { ...contacts });
            this.props.router.push("/dashboard");
        }, (err) => {
            this.setState({ showProgress: false, errorText: err.message });
            this.disableInputs(false);
        });
    }

    get shouldDisableContinueButton() {
        return !this.state.streetAddress ||
            !this.state.city ||
            !this.state.stateCode ||
            !isValidZipCode(this.state.zipCode);
    }

    onStreetAddressChange(event, streetAddress) {
        this.setState({
            streetAddress,
            errorText: null
        });
    }

    onCityChange(event, city) {
        this.setState({
            city,
            errorText: null
        });
    }

    onZipChange(event, zipCode) {
        zipCode = (isNaN(zipCode) || zipCode.length > 5) ? this.state.zipCode : zipCode;
        this.setState({
            zipCode,
            errorText: null
        });
    }

    onStateChange(event, index, stateCode) {
        this.setState({
            stateCode,
            errorText: null
        });
    }

    disableInputs(disableInputs) {
        this.setState({ disableInputs });
    }

    get streetAddress() {
        const props = {
            onChange: this.onStreetAddressChange.bind(this),
            floatingLabelText: Application.localize("welcome/streetAddressLabel"),
            disabled: this.state.disableInputs,
            value: this.state.streetAddress,
            style: {
                width: "190px"
            }
        };

        return (
            <div className="welcome__address__field">
                <TextField
                    ref={ref => this._streetAddress = ref}
                    {...props}
                />
            </div>
        );
    }

    get city() {
        const props = {
            onChange: this.onCityChange.bind(this),
            floatingLabelText: Application.localize("welcome/cityLabel"),
            disabled: this.state.disableInputs,
            value: this.state.city,
            style: {
                width: "100px"
            }
        };

        return (
            <div className="welcome__address__field">
                <TextField
                    ref={ref => this._streetAddress = ref}
                    {...props}
                />
            </div>
        );
    }

    get stateSelect(){
        const props = {
            style: {
                tabIndex: "0",
                width: "85px"
            },
            autoFocus: true,
            autoWidth: true,
            onChange: this.onStateChange.bind(this),
            maxHeight: 350,
            floatingLabelText: Application.localize("welcome/stateCodeLabel"),
            value: this.state.stateCode,
            detectAutofill: true
        };

        return (
            <div className="welcome__address__field">
                <SelectFieldEx ref={ref => this._state = ref} {...props} >
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
                </SelectFieldEx>
            </div>
        );
    }

    get inputZip() {
        const props = {
            onChange: this.onZipChange.bind(this),
            //floatingLabelFixed: true,
            floatingLabelText: Application.localize("welcome/zipCodeLabel"),
            //hintText: Application.localize("welcome/zipCodeHint"),
            disabled: this.state.disableInputs,
            value: this.state.zipCode,
            style: {
                width: "80px"
            },
            inputStyle: {
                type: "number",
                maxlength: 5
            }
        };

        return (
            <div className="welcome__address__field">
                <TextField
                    ref={ref => this._zip = ref}
                    {...props}
                />
            </div>
        );
    }

    get continueButton(){
        const props = {
            type: "submit",
            disabled: this.shouldDisableContinueButton || this.state.disableInputs,
            label: Application.localize("welcome/continue"),
            primary: true
        };
        return (
            <div className="welcome__button">
                <RaisedButton {...props} />
            </div>
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
                    <div className="cwc-screen-medium-and-up">
                        <div className="welcome__address">
                            {this.streetAddress}
                            {this.city}
                            {this.stateSelect}
                            {this.inputZip}
                        </div>
                    </div>
                    <div className="cwc-screen-small-and-down">
                        <div className="welcome__address">
                            {this.streetAddress}
                        </div>
                        <div className="welcome__address">
                            {this.city}
                            {this.stateSelect}
                            {this.inputZip}
                        </div>
                    </div>
                    <div className="welcome__center-align">
                        {this.errorString}
                        {this.continueButton}
                    </div>
                </form>
                <ProgressOverlay showProgress={this.state.showProgress} />
            </div>
        );
    }
}
