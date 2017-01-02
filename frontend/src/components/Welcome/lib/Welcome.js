import React from "react";
import { Application } from "solo-application";
import Logo from "./Logo";
import Description from "./Description";
import AddressForm from "./AddressForm";
import Footer from "./Footer";

export default class Welcome extends React.Component {
    constructor(...args) {
        super(...args);
        this._userStore = Application.stores.user;
        this._contactsStore = Application.stores.contacts;
    }

    componentDidMount() {
        this._userStore.clear();
        this._contactsStore.clear();
    }

    render() {
        return (
            <div className="welcome">
                <Logo />
                <Description />
                <AddressForm router={this.props.router} />
                <Footer />
            </div>
        );
    }
}
