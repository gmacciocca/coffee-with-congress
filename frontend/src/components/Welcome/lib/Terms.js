import React from "react";
import { Application } from "solo-application";
import Footer from "./Footer";

export default class Terms extends React.Component {

    render() {
        return (
            <div className="mission__wrapper">
                <div className="mission" >
                    <h1>{Application.localize("footer/termsAndConditions")}</h1>
                </div>
                <Footer />
            </div>
        );
    }
}
