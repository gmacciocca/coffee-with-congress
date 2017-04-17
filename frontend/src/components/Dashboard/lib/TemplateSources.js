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
        const shouldShow = !!(sources && Array.isArray(sources) && sources.length);
        if (shouldShow !== this._shouldShow) {
            setTimeout(() => {
                showToggleFunc && showToggleFunc(shouldShow);
            }, 100);
            this._shouldShow = shouldShow;
        }
        return shouldShow;
    }

    render() {
        const { refFunc, sources } = this.props;
        const shouldShow = this.shouldShow;
        const style = shouldShow ? {} : { display: "none" };
        const hasTwoSources = shouldShow && sources.length === 2;
        const hasMoreThanTwoSources = shouldShow && sources.length > 2;
        const sourcesClassname = classnames("dashboard__template-sources__list", { "dashboard__template-sources__list__two-columns": hasMoreThanTwoSources });
        const linkStyle = { width: hasTwoSources ? "50%" : "100%" };

        return (
            <div ref={refFunc} className="dashboard__template-sources-wrapper" style={style}>
                <div ref={refFunc} className="dashboard__template-sources" >
                    <label>{Application.localize("dashboard/sources")}</label>
                    <div className={sourcesClassname}>
                        {shouldShow && sources.map(source => {
                            return <LinkTo style={linkStyle} className={"dashboard__template-sources__list__link"} key={source.title} url={source.url}>{source.title}</LinkTo>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
