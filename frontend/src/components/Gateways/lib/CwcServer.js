import { Application } from "solo-application";
import CwcError from "../../CwcError";

export default class CwcServer {
    constructor({ networkTransport }) {
        this._networkTransport = networkTransport;
        this._sendAnalitics = Application.configuration.analytics.wtc;
    }

    fetchContacts(address) {
        address = encodeURIComponent(address);
        const path = `${Application.configuration.origins.cwcServer}/all_contacts?address=${address}`;
        return this._networkTransport.get(path)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_CONTACTS", {
                        message: Application.localize("gateways/invalidAddress"),
                        originalError
                    });
            });
    }

    fetchIssues(state) {
        const path = `${Application.configuration.origins.cwcServer}/issues/state/${state}`;
        return this._networkTransport.get(path)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_ISSUES", {
                        message: originalError.toString(),
                        originalError
                    });
            });
    }

    fetchTemplate(issueId, state, level) {
        const path = `${Application.configuration.origins.cwcServer}/template/issue/${issueId}/state/${state}/level/${level}`;
        return this._networkTransport.get(path)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_TEMPLATES", {
                        message: originalError.toString(),
                        originalError
                    });
            });
    }

    sendPrintStatistics({ issueId, state, level }) {
        if (!this._sendAnalitics) {
            return;
        }
        const path = `${Application.configuration.origins.cwcServer}/stats`;
        const json = { issue: issueId, state, level };
        return this._networkTransport.send(path, json);
    }

    fetchPrintStatistics() {
        const path = `${Application.configuration.origins.cwcServer}/stats`;
        return this._networkTransport.get(path)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_PRINT_STATS", {
                        message: originalError.toString(),
                        originalError
                    });
            });
    }
}
