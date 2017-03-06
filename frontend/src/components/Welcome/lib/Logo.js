import React from "react";
import { Application } from "solo-application";

const Logo = () => {
    const altText = `${Application.localize("welcome/title")} v.${Application.configuration.clientVersion}`;
    return (
        <div className="welcome__logo" >
            <img title={altText} alt={altText} className="welcome__logo__img" src="./images/congress-logo-text.svg" />
        </div>
    );
};

export default Logo;
