import React from "react";
import { Application } from "solo-application";

export default class PrintStats extends React.Component {
    constructor(...args) {
        super(...args);
        this._cwcServer = Application.roles.cwcServer;
        this._formatString = Application.roles.formatString;
        this.state = {
            letterCount: null
        };
    }

    componentWillMount() {
        this.fetchStatistics();
    }

    fetchStatistics() {
        this._cwcServer.fetchPrintStatistics()
        .then(stats => {
            const letterCount = stats.letter_count;
            this.setState({ letterCount });
        }, () => {
        });
    }

    render() {
        return this.state.letterCount ? (
            <div className="print-stats" >
                <div className="print-stats__number" >{this.state.letterCount}</div>
                <div className="print-stats__message" >{Application.localize("welcome/printStatsMessage")}</div>
            </div>
        ) : null;
    }
}
