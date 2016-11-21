import React from "react";
import { SectionsSlider } from "../../common";

export default class Letters extends React.Component {
    render() {
        const sections = [
            { title: "Section One", contents: "One contents" },
            { title: "Section Two", contents: "Two contents" },
            { title: "Section Three", contents: "Three contents" },
            { title: "Section Four", contents: "Four contents" }
        ];
        return (
            <div className="letters">
                <SectionsSlider sections={sections} />
            </div>
        );
    }
}
