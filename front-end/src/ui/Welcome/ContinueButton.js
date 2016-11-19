import React from "react";
import Button from "../common/Button";
import { Application } from "solo-application";

const ContinueButton = ({ name }) => {
    return <Button clName="welcome__continue-button" name={Application.localize("welcome/continue")} />;
};

export default ContinueButton;
