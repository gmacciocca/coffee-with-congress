import React from "react";
import { Application } from "solo-application";
import TextField from "material-ui/TextField";

const InputAddress = ({ name, onKeyDown, onChange }) => {
    return (
        <div>
            <TextField
                name={name}
                onKeyDown={onKeyDown}
                onChange={onChange}
                className="welcome__input-address"
                floatingLabelText={Application.localize("welcome/addressLabel")}
            />
        </div>
    );
};

export default InputAddress;
