import { Application } from "solo-application";

export default class ZipcodeValidation {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    stateAndCityFromZipcode(zipCode) {
        const resource = `https://api.zippopotam.us/us/${zipCode}`;
        return this._loadResource.jsonResource(resource)
            .then(response => {
                if (response && Array.isArray(response.places) &&
                    response.places.length){
                    const place = response.places[0];
                    const city = place["place name"];
                    const state = place["state abbreviation"];
                    if (city && state) {
                        return { city, state };
                    }
                }
                throw Error(Application.localize("gateways/invalidZipCode"));
            });
    }
}
