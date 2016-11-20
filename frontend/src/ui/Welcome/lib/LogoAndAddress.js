import React from "react";
import { Title, SubTitle } from "../../common";
import { Application } from "solo-application";
import InputAddress from "./InputAddress";
import ContinueButton from "./ContinueButton";

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
        this._addressValidation.stateAndCityFromZip(inputAddress)
            .then(({ city, state }) => {
                alert(`You are in: ${city}, ${state} ${inputAddress}`);
            }, (/*err*/) => {
                alert("Invalid Zip code");
            });
    }

    render() {
        return (
            <div className="welcome__logo-and-address" >
                <Title text={Application.localize("welcome/title")} />
                <SubTitle text={Application.localize("welcome/welcomeMessage")} />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <InputAddress name="inputAddress" />
                    <ContinueButton />
                </form>
            </div>
        );
    }
}

export default LogoAndAddress;
