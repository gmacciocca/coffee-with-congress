import React from "react";
import classnames from "classnames";

const ScreenOverlay = ({ shouldShow, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={classnames("common-ui__screen-overlay", { "common-ui__screen-overlay__hidden": !shouldShow })}
        />
    );
};

export default ScreenOverlay;
