import React from "react";
import { Application } from "solo-application";
import Footer from "./Footer";

export default class Mission extends React.Component {

    render() {
        return (
            <div className="mission">
                <div className="mission__wrapper" >
                    <h3>{Application.localize("footer/missionStatement")}</h3>
                    <br />
                    <div>{Application.localize("mission/part1")}</div>
                    <br />
                    <div>{Application.localize("mission/part2")}</div>
                    <br />
                    <div className="mission__amendment">
                        <span>{Application.localize("mission/part3FirstAmendment")}</span>
                        <span className="mission__amendment__last-part">
                            {Application.localize("mission/part3FirstAmendmentLastPart")}
                        </span>
                    </div>
                    <br />
                    <div>{Application.localize("mission/part4")}</div>
                    <br />
                    <div>{Application.localize("mission/part5")}</div>
                    <br />
                    <div>{Application.localize("mission/part6")}</div>
                    <br />
                    <div>{Application.localize("mission/part7")}</div>
                </div>
                <Footer />
            </div>
        );
    }
}
