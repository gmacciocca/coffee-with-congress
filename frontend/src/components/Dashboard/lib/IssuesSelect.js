import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import BaseSelect from "./BaseSelect";

export default class IssuesSelect extends BaseSelect {

    get labelText() {
        return Application.localize("dashboard/issueLabel");
    }

    primaryText({ name }) {
        return (
            <div className="dashboard__numbered-step__issue">
                {`${name}`}
            </div>
        );
    }

    render() {
        const selectProps = this.selectProps;
        return (
            <SelectField {...selectProps} >
            {
                this.props.issueGroups.groups.map(group => {
                    return (
                        <div>
                            <div className="dashboard__numbered-step__contact-breaker" >{group.name}</div>
                            {
                                group.issues.map(issue => {
                                    return (
                                        <MenuItem
                                            key={issue.id}
                                            value={issue.id}
                                            primaryText={this.primaryText(issue)}
                                        />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
            </SelectField>
        );
    }
}


/*
this.props.issues && this.props.issues.map(issue => {
    return (
        <MenuItem
            key={issue.id}
            value={issue.id}
            primaryText={issue.name}
        />
    );
})

*/
