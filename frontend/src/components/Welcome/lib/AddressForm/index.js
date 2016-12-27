import React from "react";
import { Application } from "solo-application";
import InputAddress from "./InputAddress";
import ContinueButton from "./ContinueButton";
import { ProgressOverlay } from "../../../CommonUi";

export default class AddressForm extends React.Component {
    constructor(...args) {
        super(...args);
        this._addressParser = Application.roles.addressParser;
        this._cwcServer = Application.roles.cwcServer;
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this.state = {
            disableContinueButton: true,
            disableInputs: false,
            showProgress: false,
            errorText: null
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        const elements = ev.target.elements;
        const address = elements.address.value;
        this.setState({ showProgress: true });
        this.disableInputs(true);

        this._addressParser.parse(address)
            .then((parsedAddress) => {
                this._userStore.set("address", { ...parsedAddress });
                return this._cwcServer.fetchContacts(address);
            })
            .then(contacts => {
                this._contactsStore.set("contacts", { ...contacts });
                this.props.router.push("/dashboard");
            }, (err) => {
                this.setState({ showProgress: false, errorText: err.toString() });
                this.disableInputs(false);
            });
    }

    addressOnChange(ev) {
        this.setState({ disableContinueButton: !ev.target.value, errorText: null });
        ev.preventDefault();
    }

    disableInputs(disableInputs) {
        this.setState({ disableInputs });
    }

    render() {
        return (
            <div className="welcome__address-form" >
                <form onSubmit={this.onSubmit.bind(this)}>
                    <InputAddress
                        autoFocus={true}
                        name="address"
                        onChange={this.addressOnChange.bind(this)}
                        errorText={this.state.errorText}
                        disabled={this.state.disableInputs} />
                    <ContinueButton
                        disabled={this.state.disableContinueButton || this.state.disableInputs}
                    />
                </form>
                <ProgressOverlay showProgress={this.state.showProgress} />
            </div>
        );
    }
}
