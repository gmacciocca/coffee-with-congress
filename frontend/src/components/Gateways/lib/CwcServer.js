import { Application } from "solo-application";
import CwcError from "../../CwcError";

export default class CwcServer {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    fetchContacts(address) {
        address = encodeURIComponent(address);
        const resource = `${Application.configuration.origins.cwcServer}/contacts?address=${address}`;
        return this._loadResource.jsonResource(resource)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_CONTACTS", {
                        message: Application.localize("gateways/invalidAddress"),
                        originalError
                    });
            });
    }

    fetchIssues() {
        const resource = `${Application.configuration.origins.cwcServer}/issues`;
        return this._loadResource.jsonResource(resource)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_ISSUES", {
                        message: originalError.toString(),
                        originalError
                    });
            });
    }

    fetchTemplate(issueId, state, level) {
        const resource = `${Application.configuration.origins.cwcServer}/template/issue/${issueId}/state/${state}/level/${level}`;
        return this._loadResource.jsonResource(resource)
            .catch(originalError => {
                throw new CwcError(
                    "CWC.ERROR_FETCHING_TEMPLATES", {
                        message: originalError.toString(),
                        originalError
                    });
            });
    }
}
