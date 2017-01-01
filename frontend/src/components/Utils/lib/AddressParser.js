import parser from "parse-address";
import { Application } from "solo-application";

const uppercase = (string) => string ? string.toUpperCase() : "";
const spaceBetween = (...args) => {
    const strings = [...args];
    return strings.filter(str => !!str).join(" ");
};

export default class AddressParser {
    parse(address) {
        return new Promise((resolve, reject) => {
            const rawParsed = parser.parseLocation(address);
            /*
                city: "new york"
                number: "415"
                sec_unit_num: "7G"
                sec_unit_type: "apt"
                state: "ny"
                street: "main"
                type: "street"
                zip: "10044"
            */
            const parsedAddress = {
                address: spaceBetween(rawParsed.number,
                    rawParsed.street,
                    rawParsed.type,
                    rawParsed.sec_unit_type,
                    rawParsed.sec_unit_num),
                city: rawParsed.city,
                state: uppercase(rawParsed.state),
                zip: rawParsed.zip
            };
            if (parsedAddress.state && parsedAddress.zip)
                resolve(parsedAddress);
            else
                reject(new Error(Application.localize("utils/invalidAddressFormat")));
        });
    }
}
