import React from "react";
import { Button } from "../../common";
import { Application } from "solo-application";

const ContinueButton = () => {
    return <Button clName="welcome__continue-button" name={Application.localize("welcome/continue")} />;
};

export default ContinueButton;
