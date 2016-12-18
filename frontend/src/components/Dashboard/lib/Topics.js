import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Select from "./Select";

export default class Topic extends Select {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange(event, index, value) {
        this.setState({ value });
    }

    get labelText() {
        return Application.localize("dashboard/topicLabel");
    }

    render() {
        const selectProps = this.selectProps;
        return (
            <SelectField {...selectProps} >
            {
                this.props.topics && this.props.topics.map(topic => {
                    return (<MenuItem key={topic.id} value={topic.id} primaryText={topic.name} />);
                })
            }
            </SelectField>
        );
    }
}
