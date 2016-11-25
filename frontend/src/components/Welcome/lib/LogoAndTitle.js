import React from "react";
import { Application } from "solo-application";

const LogoAndAddress = () => {
    return (
        <div className="welcome__logo-and-title" >
            <h5>{Application.localize("welcome/title")}</h5>
        </div>
    );
};

export default LogoAndAddress;
