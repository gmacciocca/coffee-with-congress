import React from "react";
import { Link } from "react-router";
import { Application } from "solo-application";

export default class Footer extends React.Component {

    render() {
        return (
            <footer className="footer__wrapper">
                <div className="footer" >
                    <div className="footer__link" ><Link to="/mission">{Application.localize("footer/missionStatement")}</Link></div>
                    <div className="footer__link__separator" />
                    <div className="footer__link" ><Link to="/about">{Application.localize("footer/aboutUs")}</Link></div>
                    <div className="footer__link__separator" />
                    <div className="footer__link" ><Link to="/faq">{Application.localize("footer/faq")}</Link></div>
                    <div className="footer__link__separator" />
                    <div className="footer__link" ><Link to="/terms">{Application.localize("footer/termsAndConditions")}</Link></div>
                </div>
            </footer>
        );
    }
}
