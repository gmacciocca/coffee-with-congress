import React from "react";
import { Application } from "solo-application";

const Description = () => {
    return (
        <div className="welcome__description flow-text" >{Application.localize("welcome/welcomeMessage")}</div>
    );
};

export default Description;
