import React from "react";
import { Application } from "solo-application";
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
