import { Application } from "solo-application";

export default class AddressValidation {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    fetchContacts(address) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!address || address === "1") {
                    reject(new Error("Invalid address"));
                    return;
                }
                const response = {
                    federal: [
                        {
                            "id": 31,
                            "name": "Leah Wynn",
                            "address1": "8837 Naper Drive",
                            "city": "Eagleville",
                            "state": "PA",
                            "zip_code": "19415",
                            "phones": [ "(610) 301-3175" ],
                            "faxes": [],
                            "emails": ["leahwynnYaT@teleosaurs.xyz"],
                            "role": "representative"
                        }
                    ],
                    "state": [
                        {
                            "id": 54,
                            "name": "Isamar Boyle",
                            "address1":  "1641 120th Drive",
                            "city": "Junction City",
                            "state": "GA",
                            "zip_code": "31812",
                            "phones": [ "(706) 301-8720" ],
                            "faxes": ["(706) 388-8720"],
                            "emails": ["isamarboyleTaT@teleosaurs.xyz"],
                            "role": "senator"
                        }, {
                            "id": 55,
                            "name": "Leah Boyle",
                            "address1": "1641 120th Drive",
                            "city": "Junction City",
                            "state": "GA",
                            "zip_code": "31812",
                            "phones": [ "(706) 388-3175" ],
                            "faxes": [],
                            "emails": ["isamarboyleTaT@teleosaurs.xyz"],
                            "role": "representative"
                        }
                    ],
                    "city": []
                };
                resolve(response);
            }, 2000);
        });
    }
}
