import { Application } from "solo-application";

const LEVEL_ID = {
    "federal": 1,
    "state": 2,
    "city": 3
};

export default class Analytics {
    constructor({ utils }) {
        this._utils = utils;
        ga("set", "appName", Application.configuration.clientName);
        ga("set", "appVersion", Application.configuration.clientVersion);
    }

    sendAppLoadedStatistics() {
        if (Application.configuration.env !== "development") {
            ga("send", "event", {
                eventCategory: "application",
                eventAction: "loaded",
                transport: "beacon"
            });
        }
    }

    sendPrintStatistics({ issueId, state, level }) {
        if (Application.configuration.env !== "development") {
            const eventCategory = this._utils.isNullOrUndefined(issueId) ? "no-issue-id" : issueId.toString();
            const eventAction = "print";
            const eventLabel = state;
            const eventValue = LEVEL_ID[level];
            ga("send", "event", {
                eventCategory,
                eventAction,
                eventLabel,
                eventValue,
                transport: "beacon"
            });
        }
    }
}
