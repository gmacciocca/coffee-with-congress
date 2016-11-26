import React from "react";
import { Application } from "solo-application";
import InputAddress from "./InputAddress";
import ContinueButton from "./ContinueButton";
import { RefreshProgress } from "../../../CommonUi";

export default class AddressForm extends React.Component {
    constructor(...args) {
        super(...args);
        this._cwcServer = Application.roles.cwcServer;
        this._contactsStore = Application.stores.contacts;
        this._store = Application.stores.data;
        this.state = {
            disableContinueButton: true,
            showProgress: false,
            errorText: null
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        const elements = ev.target.elements;
        const address = elements.address.value;
        this.setState({ showProgress: true });
        this._cwcServer.fetchContacts(address)
            .then(contacts => {
                this._store.set("address", { value: address });
                this._store.set("contacts", { value: contacts });
                this.props.router.push("/letters");
            }, (err) => {
                this.setState({ showProgress: false, errorText: err.toString() });
            });
    }

    addressOnChange(ev) {
        this.setState({ disableContinueButton: !ev.target.value, errorText: null });
        ev.preventDefault();
    }

    render() {
        return (
            <div className="welcome__address-form" >
                <form onSubmit={this.onSubmit.bind(this)}>
                    <InputAddress
                        autoFocus={false}
                        name="address"
                        onChange={this.addressOnChange.bind(this)}
                        errorText={this.state.errorText} />
                    <ContinueButton disabled={this.state.disableContinueButton} />
                </form>
                <RefreshProgress showProgress={this.state.showProgress} />
            </div>
        );
    }
}
