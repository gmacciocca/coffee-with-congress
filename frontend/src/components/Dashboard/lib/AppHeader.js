import React from "react";
import { Application } from "solo-application";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

export default class AppHeader extends React.Component {
    constructor(...args) {
        super(...args);
        this._utils = Application.roles.utils;
        this.state = {
        };
    }

    goHome() {
        this.props.router.push("/");
    }

    get printElement() {
        return this.props.onPrint ? (
            <FlatButton
                onTouchTap={this.props.onPrint}
                label={Application.localize("dashboard/print")}
            />
        ) : null;
    }

    get clickableLogo() {
        return (
            <div className="dashboard__logo" >
                <img onClick={this.goHome.bind(this)}
                    className="dashboard__logo__img" src="./images/congress-white.svg" />
            </div>
        );
    }

    render() {
        return (
            <AppBar
                iconElementLeft={this.clickableLogo}
                iconElementRight={this.printElement}
            />
        );
    }
}
