import React from "react";
import { Application } from "solo-application";
import { LinkTo } from "../../CommonUi";
import classnames from "classnames";

export default class TemplateSources extends React.Component {
    constructor(...args){
        super(...args);
        this._shouldShow = false;
    }

    get shouldShow() {
        const { showToggleFunc, sources } = this.props;
        const shouldShow = (sources && Array.isArray(sources) && sources.length);
        if (shouldShow !== this._shouldShow) {
            setTimeout(() => {
                showToggleFunc && showToggleFunc(shouldShow);
            }, 250);
            this._shouldShow = shouldShow;
        }
        return shouldShow;
    }

    render() {
        const { refFunc, sources } = this.props;
        const shouldShow = this.shouldShow;
        const style = shouldShow ? {} : { display: "none" };
        const sourceCount = shouldShow ? sources.length : 0;
        const columnsToShow =
            sourceCount === 1 ? 1 :
            sourceCount <= 4 ? 2 :
            sourceCount <= 6 ? 3 :
            sourceCount <= 8 ? 4 :
            5;

        const linkStyle = { width: `${100 / columnsToShow}%` };

        return (
            <div ref={refFunc} className="dashboard__template-sources-wrapper" style={style}>
                <div ref={refFunc} className="dashboard__template-sources" >
                    <label>{Application.localize("dashboard/sources")}</label>
                    <div className="dashboard__template-sources__list">
                        {shouldShow && sources.map(source => {
                            return <LinkTo style={linkStyle} className="dashboard__template-sources__list__link" key={source.title} url={source.url}>{source.title}</LinkTo>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
