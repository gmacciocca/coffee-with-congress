import React from "react";
import { Title, SubTitle } from "../common/Titles";
import { Application } from "solo-application";
import InputAddress from "./InputAddress";

const LogoAndAddress = () => (
    <div className="welcome__logo-and-address">
        <Title text={Application.localize("welcome/title")} />
        <SubTitle text={Application.localize("welcome/welcomeMessage")} />
        <InputAddress />
    </div>
);

export default LogoAndAddress;
