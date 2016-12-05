import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";
import classnames from "classnames";

const OverlayProgress = ({ showProgress }) => {
    return (
        <div className={classnames("common-ui__overlay-progress", { "common-ui__overlay-progress__hidden": !showProgress })}>
            <div className="common-ui__overlay-progress__indicator-container">
                <RefreshIndicator className="common-ui__overlay-progress__indicator"
                    size={40}
                    left={-20}
                    top={-20}
                    status={showProgress ? "loading" : "hide"}
                />
            </div>
        </div>
    );
};

export default OverlayProgress;
