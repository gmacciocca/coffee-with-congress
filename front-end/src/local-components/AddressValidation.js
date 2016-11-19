export default class AddressValidation {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    stateAndCityFromZip(zipCode) {
        const resource = `https://api.zippopotam.us/us/${zipCode}`;
        return this._loadResource.jsonResource(resource)
            .then(response => {
                if (response && Array.isArray(response.places) &&
                    response.places.length){
                    const place = response.places[0];
                    const city = place["place name"];
                    const state = place["state abbreviation"];
                    return city && state ? { city, state } : null;
                }
                throw Error("Invalid zip code");
            });
    }
}
