import { Application } from "solo-application";
import CwcError from "../../CwcError";

export default class CwcServer {
    constructor({ networkTransport }) {
        this._networkTransport = networkTransport;
    }

    fetchContacts(address) {
        address = encodeURIComponent(address);
        const path = `${Application.configuration.origins.cwcServer}/contacts?address=${address}`;
        return this._networkTransport.get(path)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_CONTACTS", {
                        message: Application.localize("gateways/invalidAddress"),
                        originalError
                    });
            });
    }

    fetchIssues() {
        const path = `${Application.configuration.origins.cwcServer}/issues`;
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

    sendPrintStatistics({ issueId, state, levelId }) {
        const path = `${Application.configuration.origins.cwcServer}/stats`;
        const json = { issue: issueId, state, level: levelId };
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
