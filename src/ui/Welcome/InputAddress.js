import React from "react";
import TextInput from "../common/TextInput";
import { Application } from "solo-application";

const InputAddress = () => {
    return <TextInput name={Application.localize("welcome/address-label")} />;
};

export default InputAddress;
