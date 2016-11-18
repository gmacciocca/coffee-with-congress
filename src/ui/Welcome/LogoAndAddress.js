import React from "react";
import { Title, SubTitle } from "../common/Titles";
import { Application } from "solo-application";
import InputAddress from "./InputAddress";

class LogoAndAddress extends React.Component {
    constructor(...args) {
        super(...args);
        this._addressValidation = Application.roles.addressValidation;
    }

    componentWillMount() {
    }

    onSubmit(ev) {
        ev.preventDefault();
        const elements = ev.target.elements;
        const inputAddress = elements.inputAddress.value;
        this._addressValidation.stateAndCityFromZip(inputAddress);
    }

    render() {
        return (
            <div className="welcome__logo-and-address" >
                <Title text={Application.localize("welcome/title")} />
                <SubTitle text={Application.localize("welcome/welcomeMessage")} />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <InputAddress name="inputAddress" />
                    <button /*onClick={onClick}*/ >Continue</button>
                </form>
            </div>
        );
    }
}

export default LogoAndAddress;
