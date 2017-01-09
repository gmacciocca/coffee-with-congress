import React from "react";
import { Link } from "react-router";
import { Application } from "solo-application";
import LinkTo from "./LinkTo";

const TLogo = () => {
    return (
        <LinkTo url="https://twitter.com/writetocongress">
            <img className="footer__item__social__logo" src="./images/twitter.svg" />
        </LinkTo>
    );
};

const ILogo = () => {
    return (
        <LinkTo url="https://www.instagram.com/writetocongress2016">
            <img className="footer__item__social__logo" src="./images/instagram.svg" />
        </LinkTo>
    );
};

const FLogo = () => {
    return (
        <LinkTo url="https://www.facebook.com/WritetoCongress">
            <img className="footer__item__social__logo" src="./images/facebook.svg" />
        </LinkTo>
    );
};

export default class Footer extends React.Component {
    render() {
        const logos = [ TLogo, ILogo, FLogo ];
        return (
            <footer className="footer__wrapper">
                <div className="footer" >
                    <div className="footer__item" ><Link to="/mission">{Application.localize("footer/missionStatement")}</Link></div>
                    <div className="footer__item__separator" />
                    <div className="footer__item" ><Link to="/about">{Application.localize("footer/aboutUs")}</Link></div>
                    <div className="footer__item__separator" />
                    <div className="footer__item" ><Link to="/faq">{Application.localize("footer/faq")}</Link></div>
                    <div className="footer__item__separator" />
                    <div className="footer__item" ><Link to="/terms">{Application.localize("footer/termsAndConditions")}</Link></div>
                    <div className="footer__item__separator" />
                    <div className="footer__item footer__item__social" >
                        <TLogo />
                        <ILogo />
                        <FLogo />
                    </div>
                </div>
            </footer>
        );
    }
}
