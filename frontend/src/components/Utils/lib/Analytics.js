import { Application } from "solo-application";
import levelIds from "./levelIds";

export default class Analytics {
    constructor({ utils }) {
        this._utils = utils;
        ga("set", "appName", Application.configuration.clientName);
        ga("set", "appVersion", Application.configuration.clientVersion);
    }

    sendAppLoadedEvent() {
        ga("send", "event", {
            eventCategory: "application",
            eventAction: "loaded",
            transport: "beacon"
        });
    }

    sendPrintEvent({ issueId, state, level }) {
        debugger;
        const eventCategory = this._utils.isNullOrUndefined(issueId) ? "no-issue-id" : issueId.toString();
        const eventAction = "print";
        const eventLabel = state;
        const eventValue = levelIds[level];
        ga("send", "event", {
            eventCategory,
            eventAction,
            eventLabel,
            eventValue,
            transport: "beacon"
        });
    }
}
