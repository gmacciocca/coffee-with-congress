import React from "react";
import SelectField from "material-ui/SelectField";

export default class SelectFieldEx extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            autofillValue: null
        };
    }

    onChange(e) {
        this.setState({ autofillValue: e.target.value });
    }

    get hiddenInput() {
        const style = {
            position: "fixed",
            visibility: "none",
            top: "-100em",
            left: "-100em"
        };
        return <input style={style} tabIndex="-1" onChange={this.onChange.bind(this)} type="text" name="state" />;
    }

    render() {
        const { detectAutofill, ...props } = this.props;
        if (this.state.autofillValue) {
            props.value = this.state.autofillValue;
            props.onChange(null, null, this.state.autofillValue);
            this.setState({ autofillValue: null });
        }
        return (
            <div>
                {detectAutofill ? this.hiddenInput : null}
                <SelectField {...props} />
            </div>
        );
    }
}

SelectFieldEx.propTypes = {
    detectAutofill: React.PropTypes.bool
};
