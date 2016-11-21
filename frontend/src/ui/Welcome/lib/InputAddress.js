import React from "react";
import { TextInput } from "../../common";
import { Application } from "solo-application";

const InputAddress = ({ name, onKeyDown, onChange }) => {
    return (
        <TextInput
            clName="welcome__input-address"
            name={name}
            onKeyDown={onKeyDown}
            onChange={onChange}
            placeholder={Application.localize("welcome/addressPlaceholder")}
        />
    );
};

export default InputAddress;
