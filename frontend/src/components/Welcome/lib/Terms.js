import React from "react";
import { Application } from "solo-application";
import Footer from "./Footer";
import TermsText from "./termsText";

export default class Terms extends React.Component {
    constructor(...args) {
        super(...args);
        this.appHeader = Application.roles.uiAppHeader;
    }

    render() {
        const AppHeader = this.appHeader;

        return (
            <div className="mission">
                <AppHeader
                    router={this.props.router}
                />
                <div className="mission__wrapper" >
                    <h3>{Application.localize("footer/termsAndConditions")}</h3>
                    <TermsText />
                </div>
                <Footer />
            </div>
        );
    }
}
