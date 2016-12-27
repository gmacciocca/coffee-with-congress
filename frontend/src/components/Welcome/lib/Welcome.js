import React from "react";
import { Application } from "solo-application";
import LogoAndTitle from "./LogoAndTitle";
import Description from "./Description";
import AddressForm from "./AddressForm";

export default class Welcome extends React.Component {
    constructor(...args) {
        super(...args);
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
        this._templatesStore = Application.stores.templates;
    }

    componentDidMount() {
        this._userStore.clear();
        this._contactsStore.clear();
        this._templatesStore.clear();
    }

    render() {
        return (
            <div className="welcome">
                <LogoAndTitle />
                <Description />
                <AddressForm router={this.props.router} />
            </div>
        );
    }
}
