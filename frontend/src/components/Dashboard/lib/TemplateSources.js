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
            sourceCount <= 2 ? 0 : // no columns required for 1 or 2 sources
            sourceCount <= 4 ? 2 :
            sourceCount <= 6 ? 3 :
            sourceCount <= 8 ? 4 :
            5;

        const sourcesClassname = classnames(
            "dashboard__template-sources__list",
            {
                "dashboard__template-sources__list__two-columns": 2 === columnsToShow,
                "dashboard__template-sources__list__three-columns": 3 === columnsToShow,
                "dashboard__template-sources__list__four-columns": 4 === columnsToShow,
                "dashboard__template-sources__list__five-columns": 5 === columnsToShow
            });

        const linkClassname = classnames(
            "dashboard__template-sources__list__link",
            {
                "dashboard__template-sources__list__link__width-50": 2 === sourceCount,
                "dashboard__template-sources__list__link__width-100": 2 !== sourceCount
            });

        return (
            <div ref={refFunc} className="dashboard__template-sources-wrapper" style={style}>
                <div ref={refFunc} className="dashboard__template-sources" >
                    <label>{Application.localize("dashboard/sources")}</label>
                    <div className={sourcesClassname}>
                        {shouldShow && sources.map(source => {
                            return <LinkTo className={linkClassname} key={source.title} url={source.url}>{source.title}</LinkTo>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
