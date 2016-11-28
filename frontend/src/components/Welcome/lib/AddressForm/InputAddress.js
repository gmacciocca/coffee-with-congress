import React from "react";
import { Application } from "solo-application";
import TextField from "material-ui/TextField";

const InputAddress = ({ disabled, autoFocus, name, onKeyDown, onChange, errorText }) => {
    return (
        <div>
            <TextField
                name={name}
                onKeyDown={onKeyDown}
                onChange={onChange}
                autoFocus={autoFocus}
                className="welcome__input-address"
                floatingLabelText={Application.localize("welcome/addressLabel")}
                hintText={Application.localize("welcome/addressHint")}
                errorText={errorText}
                disabled={disabled}
            />
        </div>
    );
};

export default InputAddress;
