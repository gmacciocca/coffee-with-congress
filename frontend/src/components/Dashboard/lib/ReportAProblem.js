import React from "react";
import { Application } from "solo-application";
import { LinkTo } from "../../CommonUi";

const REPORT_A_PROBLEM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdi3kRKPED8QLVVXNqGL8dhuCz7ldbE1YorNT1XGQ6niXtYLQ/viewform";

export default class ReportAProblem extends React.Component {
    render() {
        const { refFunc } = this.props;
        return (
            <div ref={refFunc} className="dashboard__report-a-problem">
                <LinkTo url={REPORT_A_PROBLEM_URL}>{Application.localize("dashboard/reportAProblem")}</LinkTo>
            </div>
        );
    }
}
