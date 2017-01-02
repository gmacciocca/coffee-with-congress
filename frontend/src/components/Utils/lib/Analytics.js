import { Application } from "solo-application";
import levelIds from "./levelIds";

export default class Analytics {
    constructor() {
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
        const levelId = levelIds[level];
        ga("send", "event", {
            eventCategory: issueId,
            eventAction: "print",
            eventLabel: state,
            eventValue: levelId,
            transport: "beacon"
        });
    }
}
