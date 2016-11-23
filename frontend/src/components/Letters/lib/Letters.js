import React from "react";
import { SectionsSlider } from "../../CommonUi";

export default class Letters extends React.Component {
    render() {
        const sections = [
            { title: "City", contents: "One contents" },
            { title: "State", contents: "Two contents" },
            { title: "Federal", contents: "Three contents" },
        ];
        return (
            <div className="letters">
                <SectionsSlider clName="letters__representatives-by-level" sections={sections} />
            </div>
        );
    }
}
