import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import BaseSelect from "./BaseSelect";

export default class IssuesSelect extends BaseSelect {

    get labelText() {
        return Application.localize("dashboard/issueLabel");
    }

    render() {
        const selectProps = this.selectProps;
        return (
            <SelectField {...selectProps} >
            {
                this.props.issues && this.props.issues.map(issue => {
                    return (
                        <MenuItem
                            key={issue.id}
                            value={issue.id}
                            primaryText={issue.name}
                        />
                    );
                })
            }
            </SelectField>
        );
    }
}
