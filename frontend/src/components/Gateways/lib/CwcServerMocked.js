import { Application } from "solo-application";
import CwcError from "../../CwcError";

const ISSUE_NAMES = {
    1: "Trump Administration / Nominees",
    2: "Healthcare",
    3: "Immigration",
    4: "Reproductive Rights",
    5: "Civil Liberties / First Amendment",
    6: "Marriage Equality",
    7: "Police Brutality / Criminal Justice",
    8: "Refugees",
    9: "Gun Safety Laws"
};

export default class CwcServerMoked {
    constructor({ loadResource }) {
        this._loadResource = loadResource;
    }

    fetchContacts(address) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!address || address === "1") {
                    reject(new CwcError(
                        "CWC.ERROR_FETCHING_CONTACTS", {
                            message: Application.localize("gateways/invalidAddress"),
                            originalError
                        }));
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
                            "role": "a great representative of a state that is far away",
                            "party": "Republican"
                        }, {
                            "id": 32,
                            "name": "Frank Cooper",
                            "address1": "8837 Peter Drive",
                            "city": "Princeville",
                            "state": "CA",
                            "zip_code": "94110",
                            "phones": [ "(610) 301-3175" ],
                            "faxes": [],
                            "emails": ["psmith@teleosaurs.xyz"],
                            "role": "a great representative of a state that is far away",
                            "party": "Democratic"
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
                            "role": "senator",
                            "party": "Democratic"
                        }, {
                            "id": 55,
                            "name": "Leah Boyle",
                            "address1": "1641 120th Drive",
                            "city": "Junction City",
                            "state": "GA",
                            "zip_code": "31812",
                            "faxes": [],
                            "emails": ["isamarboyleTaT@teleosaurs.xyz"],
                            "role": "representative"
                        }, {
                            "id": 56,
                            "name": "Francicso de la Fuente Y Mendoza de la Caveza de L'Ocho",
                            "address1": "1641 120th Drive",
                            "city": "Junction City",
                            "state": "GA",
                            "zip_code": "31812",
                            "phones": [ "(706) 388-3175" ],
                            "faxes": [],
                            "emails": ["isamarboyleTaT@teleosaurs.xyz"],
                            "role": "representative",
                            "party": "Republican"
                        }
                    ],
                    city: [
                        {
                            "id": 100,
                            "name": "Peter Smith",
                            "address1":  "415 Main Street",
                            "city": "Campbell",
                            "state": "CA",
                            "zip_code": "94110",
                            "phones": [ "(408) 555-1234" ],
                            "faxes": ["(408) 555-5678"],
                            "emails": ["petersmith@teleosaurs.xyz"],
                            "role": "controller",
                            "party": "Republican"
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
                            "role": "representative",
                            "party": "Democratic"
                        }, {
                            "id": 102,
                            "name": "Brian Anderson",
                            "address1": "43 Knotts Street",
                            "city": "Sausalito",
                            "state": "CA",
                            "zip_code": "94110",
                            "party": "Democratic"
                        }
                    ]
                };
                resolve(response);
            }, 1000);
        });
    }

    fetchIssues() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = [{
                    id: 1,
                    name: ISSUE_NAMES[1]
                }, {
                    id: 2,
                    name: ISSUE_NAMES[2]
                }, {
                    id: 3,
                    name: ISSUE_NAMES[3]
                }, {
                    id: 4,
                    name: ISSUE_NAMES[4]
                }, {
                    id: 5,
                    name: ISSUE_NAMES[5]
                }, {
                    id: 6,
                    name: ISSUE_NAMES[6]
                }, {
                    id: 7,
                    name: ISSUE_NAMES[7]
                }, {
                    id: 8,
                    name: ISSUE_NAMES[8]
                }, {
                    id: 9,
                    name: ISSUE_NAMES[9]
                }];
                resolve(response);
            }, 500);
        });
    }

    fetchTemplate(issueId, state, level) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (level === "city" && state === "OK") {
                    reject(new Error(Application.localize("gateways/noData")));
                } else {
                    const response = {
                        id: `${issueId}${state}${level}`,
                        content: `Dear [NAME_OF_REPRESENTATIVE],\nMy name is [NAME_OF_USER] and I live in [STATE]. I would like to fix everything about ${ISSUE_NAMES[issueId]}!!\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.\n\nSincerely,\n[NAME_OF_USER]`
                    };
                    resolve(response);
                }
            }, 500);
        });
    }
}
