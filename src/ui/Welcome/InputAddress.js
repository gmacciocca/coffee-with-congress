import React from "react";
import TextInput from "../common/TextInput";
import { Application } from "solo-application";

const InputAddress = ({ name }) => {
    return <TextInput name={name} placeholder={Application.localize("welcome/address-label")} />;
};

export default InputAddress;
