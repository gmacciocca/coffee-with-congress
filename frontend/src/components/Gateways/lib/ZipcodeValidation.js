import { Application } from "solo-application";

const uppercase = (string) => string ? string.toUpperCase() : "";

export default class ZipcodeValidation {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    addressFromZipcode(zipCode) {
        const resource = `https://api.zippopotam.us/us/${zipCode}`;
        return this._loadResource.jsonResource(resource)
            .then(response => {
                if (response && Array.isArray(response.places) &&
                    response.places.length){
                    const place = response.places[0];
                    const city = place["place name"];
                    const state = place["state abbreviation"];
                    if (city && state) {
                        const parsedAddress = {
                            address: "",
                            city: city,
                            state: uppercase(state),
                            zip: zipCode
                        };
                        return parsedAddress;
                    }
                }
                throw Error(Application.localize("gateways/invalidZipCode"));
            }, () => {
                throw Error(Application.localize("gateways/invalidZipCode"));
            });
    }
}
