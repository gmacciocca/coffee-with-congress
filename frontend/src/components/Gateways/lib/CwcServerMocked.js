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
                    state: [
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
                        }, {
                            "id": 56,
                            "name": "Francicso de la Fuente Y Mendoza de la Caeza de L'Ocho",
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
                    city: [
                        {
                            "id": 100,
                            "name": "Peter Smith",
                            "address1":  "415 Main Streer",
                            "city": "Campbell",
                            "state": "CA",
                            "zip_code": "94110",
                            "phones": [ "(408) 555-1234" ],
                            "faxes": ["(408) 555-5678"],
                            "emails": ["petersmith@teleosaurs.xyz"],
                            "role": "controller"
                        }, {
                            "id": 101,
                            "name": "Mary White",
                            "address1": "52 Hamilton Ave",
                            "city": "Saratoga",
                            "state": "MO",
                            "zip_code": "84320",
                            "phones": [ "(123) 555-4321" ],
                            "faxes": [],
                            "emails": ["mwhite@teleosaurs.xyz"],
                            "role": "representative"
                        }
                    ]
                };
                resolve(response);
            }, 2000);
        });
    }
}
