import React from "react";
import { Application } from "solo-application";
import Footer from "./Footer";
import FaqText from "./faqText";

export default class Faq extends React.Component {
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
                    <h3>{Application.localize("footer/faq")}</h3>
                    <FaqText />
                </div>
                <Footer />
            </div>
        );
    }
}
