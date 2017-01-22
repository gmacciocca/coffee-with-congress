import { Application } from "solo-application";

const cloneObject = (source) => JSON.parse(JSON.stringify(source));

const SALUTATIONS = {
    "President of the United States" : {
        address: "President",
        template: "President"
    },
    "Speaker of the House of Representatives" : {
        address: "The Honorable Speaker",
        template: "Speaker"
    },
    "Vice-President of the United States" : {
        address: "Vice-President",
        template: "Vice-President"
    },
    "Governor" : {
        address: "Governor",
        template: "Governor"
    },
    "Lieutenant Governor" : {
        address: "Lieutenant Governor",
        template: "Lieutenant Governor"
    },
    "United States Senate" : {
        address: "Senator",
        template: "Senator"
    },
    "United States House of Representatives" : {
        address: "The Honorable",
        template: "Representative"
    },
    "State Assembly District" : {
        address: "The Honorable",
        template: "Representative"
    },
    "State Senate District" : {
        address: "The Honorable",
        template: "Representative"
    }
};

const HARD_CODED_CONTACTS = {
    federal:[{
        "phones":["(202) 225-0600"],
        "address1":"H-232 The Capitol",
        "address2":"",
        "city":"Washington",
        "name":"Paul Ryan",
        "emails":[],
        "state":"DC",
        "role":"Speaker of the House of Representatives",
        "party":"Republican",
        "zip_code":"20515",
        "displayLevel": "leadership"
    }],
    state: [],
    city: []
};

const findHighestContactId = (contacts) => {
    let highestContactId = 0;
    Object.keys(contacts).forEach(level => {
        contacts[level].forEach(contact => {
            highestContactId = Math.max(contact.id, highestContactId);
        });
    });
    return highestContactId;
};

const assignContactId = (contacts, highestContactId) => {
    Object.keys(contacts).forEach(level => {
        contacts[level].forEach(contact => {
            contact.id = ++highestContactId;
        });
    });
    return;
};

const isLeadershipContact = (contact) => {
    const role = contact.role.toLowerCase();
    if (contact.displayLevel === "leadership" ||
        (contact.level === "federal" && role.indexOf("president") !== -1)) {
        return true;
    }
};

const isFederalSenatorContact = (contact) => {
    const role = contact.role.toLowerCase();
    if (contact.level === "federal" && role.indexOf("senate") !== -1) {
        return true;
    }
};

const isHouseOfRepContact = (contact) => {
    const role = contact.role.toLowerCase();
    if (contact.level === "federal" && role.indexOf("house of representatives") !== -1) {
        return true;
    }
};

const findFirstContact = (contacts, callback) => {
    let firstContact;
    Object.keys(contacts).forEach(level => {
        contacts[level].forEach(contact => {
            if (!firstContact && callback(contact)) {
                firstContact = contact;
            }
        });
    });
    return firstContact;
};

const markInitialDefaultContact = (contacts) => {
    const defaultContact =
        findFirstContact(contacts, isFederalSenatorContact) ||
        findFirstContact(contacts, isHouseOfRepContact) ||
        (contacts.federal && contacts.federal[0]) ||
        (contacts.state && contacts.state[0]) ||
        (contacts.city && contacts.city[0]);

    if (defaultContact) {
        defaultContact.initialDefaultContact = true;
    }
};

const setSalutations = (contact) => {
    const role = contact.role.toLowerCase();
    Object.keys(SALUTATIONS).some(salutationKey => {
        const lowerSalutationKey = salutationKey.toLowerCase();
        const keyLenght = salutationKey.length;
        const existingKeyLenght = (contact.salutations && contact.salutations._keyLenght) || 0;
        if (role.includes(lowerSalutationKey) &&
            keyLenght > existingKeyLenght){
            contact.salutations = SALUTATIONS[salutationKey];
            contact.salutations._keyLenght = keyLenght;
        }
    });
};

const processContacts = (contacts) => {
    const filtered = {};
    const hardcodedContacts = cloneObject(HARD_CODED_CONTACTS);
    const highestContactId = findHighestContactId(contacts);
    assignContactId(hardcodedContacts, highestContactId);

    Object.keys(contacts).map(level => {

        // Filter out contact levels that are not in the officialLevels array
        if (Application.configuration.officialLevels.find(officialLevel => officialLevel === level)) {
            filtered[level] = contacts[level];

            // Append hardcoded list of contact
            if (Array.isArray(hardcodedContacts[level])){
                filtered[level].push(...hardcodedContacts[level]);
            }

            // assign "level" and "displayLevel" property to each contact (needed later for faster processing)
            filtered[level].forEach(contact => {
                contact.level = level;
                if (isLeadershipContact(contact)){
                    contact.displayLevel = "leadership";
                } else {
                    contact.displayLevel = level;
                }
                setSalutations(contact);
            });

            filtered[level].sort(function(a, b) {
                return a.id > b.id;
            });
        }
    });

    markInitialDefaultContact(filtered);
    return filtered;
};

export default processContacts;
