import React from "react";
import LogoAndAddress from "./LogoAndAddress";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <LogoAndAddress />
            </div>
        );
    }
}
