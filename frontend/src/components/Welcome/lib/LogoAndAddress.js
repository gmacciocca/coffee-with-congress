import React from "react";
import { Title, SubTitle } from "../../CommonUi";
import { Application } from "solo-application";
import InputAddress from "./InputAddress";
import ContinueButton from "./ContinueButton";

class LogoAndAddress extends React.Component {
    constructor(...args) {
        super(...args);
        this._addressValidation = Application.roles.addressValidation;
        this.state = {
            disableContinueButton: true
        };
    }

    componentWillMount() {
    }

    onSubmit(ev) {
        ev.preventDefault();
        const elements = ev.target.elements;
        const address = elements.address.value;
        this._addressValidation.validateAddress(address)
            .then(() => {
                this.props.router.push("/letters");
            }, (/*err*/) => {
                alert("Invalid Zip code");
            });
    }

    addressOnChange(ev) {
        this.setState({ disableContinueButton: !ev.target.value });
        ev.preventDefault();
    }

    render() {
        return (
            <div className="welcome__logo-and-address" >
                <Title text={Application.localize("welcome/title")} />
                <SubTitle text={Application.localize("welcome/welcomeMessage")} />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <InputAddress
                        name="address"
                        onChange={this.addressOnChange.bind(this)}
                    />
                    <ContinueButton disabled={this.state.disableContinueButton} />
                </form>
            </div>
        );
    }
}

export default LogoAndAddress;
