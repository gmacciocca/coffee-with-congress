import React from "react";
import { Welcome } from "../../Welcome";

export default class AppShell extends React.Component {
    render() {
        return (
            <div className="appshell">
                <Welcome router={this.props.router} />
            </div>
        );
    }
}
