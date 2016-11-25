import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";
import classnames from "classnames";

const RefreshProgress = ({ showProgress }) => {
    return (
        <div className={classnames("common-ui__refresh-progress-overlay", { "common-ui__refresh-progress-overlay__hidden": !showProgress })}>
            <div className="common-ui__refresh-progress-overlay__indicator-container">
                <RefreshIndicator className="common-ui__refresh-progress-overlay__indicator"
                    size={40}
                    left={-20}
                    top={-20}
                    status={showProgress ? "loading" : "hide"}
                />
            </div>
        </div>
    );
};

export default RefreshProgress;
