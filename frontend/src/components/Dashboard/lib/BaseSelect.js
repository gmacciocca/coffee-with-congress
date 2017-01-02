import React from "react";
import { Application } from "solo-application";

export default class BaseSelect extends React.Component {
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
            value: this.props.selectedId,
            onChange: this.props.onChange.bind(this),
            floatingLabelFixed: true,
            floatingLabelText: this.labelText,
            hintText: this.selectHintText
        };
    }

    render() {
        return null;
    }
}
