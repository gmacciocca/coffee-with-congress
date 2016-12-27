import { Application } from "solo-application";

export default class CwcServer {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    fetchContacts(address) {
        address = encodeURIComponent(address);
        const resource = `${Application.configuration.origins.cwcServer}/contacts?address=${address}`;
        return this._loadResource.jsonResource(resource);
    }

    fetchIssues() {
        const resource = `${Application.configuration.origins.cwcServer}/issues`;
        return this._loadResource.jsonResource(resource);
    }

    fetchTemplate(issueId, state, level) {
        const resource = `${Application.configuration.origins.cwcServer}/issues/${issueId}/state/${state}/level/${level}`;
        return this._loadResource.jsonResource(resource);
    }
}
