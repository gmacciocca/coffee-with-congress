import { Application } from "solo-application";

const LEVEL_ID = {
    "federal": 1,
    "state": 2,
    "city": 3
};

export default class Analytics {
    constructor({ utils }) {
        this._utils = utils;
        this._sendAnalitics = Application.configuration.analytics.google;
        if (this._sendAnalitics) {
            ga("create", "UA-89461481-1", "auto"); // eslint-disable-line
            ga("set", "appName", Application.configuration.clientName); // eslint-disable-line
            ga("set", "appVersion", Application.configuration.clientVersion); // eslint-disable-line
        }
    }

    sendAppLoadedStatistics() {
        if (!this._sendAnalitics) {
            return;
        }
        ga("send", "event", { // eslint-disable-line
            eventCategory: "application",
            eventAction: "loaded",
            transport: "beacon"
        });
    }

    sendPrintStatistics({ issueId, state, level }) {
        if (!this._sendAnalitics) {
            return;
        }
        const eventCategory = this._utils.isNullOrUndefined(issueId) ? "no-issue-id" : issueId.toString();
        const eventAction = "print";
        const eventLabel = state;
        const eventValue = LEVEL_ID[level];
        ga("send", "event", { // eslint-disable-line
            eventCategory,
            eventAction,
            eventLabel,
            eventValue,
            transport: "beacon"
        });
    }

    sendCallStatistics({ issueId, state, level }) {
        if (!this._sendAnalitics) {
            return;
        }
        const eventCategory = this._utils.isNullOrUndefined(issueId) ? "no-issue-id" : issueId.toString();
        const eventAction = "call";
        const eventLabel = state;
        const eventValue = LEVEL_ID[level];
        ga("send", "event", { // eslint-disable-line
            eventCategory,
            eventAction,
            eventLabel,
            eventValue,
            transport: "beacon"
        });
    }
}
