const USPS_USERID = "487NONE04270";

export default class AddressValidation {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }
    stateAndCityFromZip(zipCode) {
        const resource = `http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="${USPS_USERID}"><ZipCode ID= \"0\"><Zip5>${zipCode}</Zip5></ZipCode></CityStateLookupRequest>`;
        this._loadResource.xmlResource(resource)
            .then(xmlElement => {
                console.log(xmlElement); // eslint-disable-line no-console
            });
    }
}
