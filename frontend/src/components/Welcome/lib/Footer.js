import React from "react";
import { Application } from "solo-application";

export default class Footer extends React.Component {

    render() {
        return (
            <footer className="footer__wrapper">
                <div className="footer" >
                    <div className="footer__link" >{Application.localize("footer/missionStatement")}</div>
                    <div className="footer__link__separator" />
                    <div className="footer__link" >{Application.localize("footer/aboutUs")}</div>
                    <div className="footer__link__separator" />
                    <div className="footer__link" >{Application.localize("footer/termsAndConditions")}</div>
                </div>
            </footer>
        );
    }
}
