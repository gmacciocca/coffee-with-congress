import React from "react";
import { TextInput } from "../../common";
import { Application } from "solo-application";

const InputAddress = ({ name }) => {
    return <TextInput clName="welcome__input-address" name={name} placeholder={Application.localize("welcome/addressPlaceholder")} />;
};

export default InputAddress;
