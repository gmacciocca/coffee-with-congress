import { Application } from "solo-application";

export default class AddressValidation {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    fetchContacts(address) {
        address = encodeURIComponent(address);
        const resource = `${Application.configuration.origins.cwcServer}/contacts?address=${address}`;
        return this._loadResource.jsonResource(resource);
    }

    fetchTopics() {
        const resource = `${Application.configuration.origins.cwcServer}/issues`;
        return this._loadResource.jsonResource(resource);
    }
}
