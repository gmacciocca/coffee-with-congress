import React from "react";
import LogoAndTitle from "./LogoAndTitle";
import Description from "./Description";
import AddressForm from "./AddressForm";

export default class Welcome extends React.Component {
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
