import { Application } from "solo-application";

export default class Analytics {
    constructor() {
        ga("set", "appName", Application.configuration.clientName);
        ga("set", "appVersion", Application.configuration.clientVersion);
    }

    sendAppLoadedEvent() {
        ga("send", "event", {
            eventCategory: "application",
            eventAction: "loaded",
            eventLabel: event.target.href,
            transport: "beacon"
        });
    }

    sendPrintEvent(issue, state, contact) {
        // Number of letters printed, broken down by official, location, issue
        ga("send", "event", {
            eventCategory: "letter",
            eventAction: "print",
            eventLabel: event.target.href,
            transport: "beacon"
        });
    }
}
