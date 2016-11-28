import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const items = [
    <MenuItem key={1} value={1} primaryText="First Topic" />,
    <MenuItem key={2} value={2} primaryText="Second Topic" />,
    <MenuItem key={3} value={3} primaryText="Third Topic" />,
    <MenuItem key={4} value={4} primaryText="Fourth Topic" />,
    <MenuItem key={5} value={5} primaryText="Fifth Topic" />,
];

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange(event, index, value) {
        this.setState({ value });
    }

    render() {
        return (
            <SelectField
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                floatingLabelText={Application.localize("letters/topicLabel")}
            >
            {items}
            </SelectField>
        );
    }
}
