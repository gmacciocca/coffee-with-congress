import React from "react";
import { Title, SubTitle } from "./Titles";
import { Application } from "solo-application";
import Ui from "./ui";

const LogoAndWelcome = () => (
    <div className="main-logo">
        <Title text={Application.localize("appShell/title")} />
        <SubTitle text={Application.localize("appShell/welcomeMessage")} />
    </div>
);


export default class AppShell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="appshell">
                <Ui />
            </div>
        );
    }
}
