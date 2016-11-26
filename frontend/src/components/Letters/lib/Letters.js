import React from "react";
import { Application } from "solo-application";
import ContactsDrawer from "./ContactsDrawer";

export default class Letters extends React.Component {
    constructor(...args) {
        super(...args);
        this._store = Application.stores.data;
        this.state = {
            address: null,
            contacts: null,
            isContactsDrawerOpen: true
        };
    }

    componentWillMount() {
        const address = this._store.get("address");
        const contacts = this._store.get("contacts");
        if (address && contacts) {
            this.setState({ address: address.value, contacts: contacts.value });
        } else {
            this.props.router.push("/");
        }
    }

    onDrawerUpdate(contacts) {
        this._store.set("contacts", { value: contacts });
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="letters">
                <ContactsDrawer
                    isOpen={this.state.isContactsDrawerOpen}
                    clName="letters__representatives-by-level"
                    contacts={this.state.contacts}
                    onUpdate={this.onDrawerUpdate.bind(this)}
                />
            </div>
        );
    }
}
