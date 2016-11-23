import React from "react";
import { Button } from "../../CommonUi";
import { Application } from "solo-application";

const ContinueButton = ({ disabled }) => {
    return (
        <Button
            clName="welcome__continue-button"
            name={Application.localize("welcome/continue")}
            disabled={disabled}
        />
    );
};

export default ContinueButton;
