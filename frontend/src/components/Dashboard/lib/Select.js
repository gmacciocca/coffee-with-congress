import React from "react";
import { Application } from "solo-application";

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    get selectHintText() {
        return Application.localize("dashboard/selectHint");
    }

    get selectProps() {
        return {
            style: {
                width: "100%"
            },
            autoWidth: true,
            value: this.state.value,
            onChange: this.handleChange.bind(this),
            floatingLabelStyle: {
                color: Application.configuration.colors["main-blue"]
            },
            floatingLabelFixed: true,
            floatingLabelText: this.labelText,
            hintText: this.selectHintText
        };
    }

    render() {
        return null;
    }
}
