import React from "react";
import { Application } from "solo-application";
import Footer from "./Footer";
import MissionText from "./missionText";

export default class Mission extends React.Component {
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
                    <h3>{Application.localize("footer/missionStatement")}</h3>
                    <MissionText />
                </div>
                <Footer />
            </div>
        );
    }
}
