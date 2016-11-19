const USPS_USERID = "487NONE04270";

export default class AddressValidationUsps {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    stateAndCityFromZip(zipCode) {
        const resource = "http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=" +
                `<CityStateLookupRequest USERID="${USPS_USERID}"><ZipCode ID= "0"><Zip5>${zipCode}</Zip5></ZipCode></CityStateLookupRequest>`;
        return this._loadResource.xmlResource(resource)
            .then(xmlElement => {
                const addressResponseBlock = this._getChildNamed(xmlElement, "ZipCode");
                if (addressResponseBlock){
                    const city = this._getValueOfChildNamed(addressResponseBlock, "City");
                    const state = this._getValueOfChildNamed(addressResponseBlock, "State");
                    return city && state ? { city, state } : null;
                }
                return null;
            });
    }

    _getChildNamed(parent, name) {
        const children = parent.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].tagName === name) {
                return children[i];
            }
        }
    }

    _getValueOfChildNamed(parent, name) {
        const child = this._getChildNamed(parent, name);
        return (child && child.firstChild) ? child.firstChild.nodeValue : undefined;
    }
}
