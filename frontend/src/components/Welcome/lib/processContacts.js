import { Application } from "solo-application";

const HARD_CODED_BASE_ID = 1000000;
const HARD_CODED_CONTACTS = {
    federal:[{
        "phones":["(202) 225-0600"],
        "address1":"H-232 The Capitol",
        "address2":"",
        "id": HARD_CODED_BASE_ID,
        "city":"Washington",
        "name":"Paul Ryan",
        "emails":[],
        "state":"DC",
        "role":"Speaker of the House of Representatives",
        "party":"Republican",
        "zip_code":"20515"
    }],
    state: [],
    city: []
};

const processContacts = (contacts) => {
    const filtered = {};
    Object.keys(contacts).map(level => {

        // Filter out contact levels that are not in the officialLevels array
        if (Application.configuration.officialLevels.find(officialLevel => officialLevel === level)) {
            filtered[level] = contacts[level];

            // Append hardcoded list of contact
            if (HARD_CODED_CONTACTS[level]){
                Object.assign(filtered[level], HARD_CODED_CONTACTS[level]);
            }

            // assign level property to each contact (needed later for faster processing)
            filtered[level].forEach(contact => {
                contact.level = level;
            });

            filtered[level].sort(function(a, b) {
                return a.id > b.id;
            });
        }
    });
    return filtered;
};

export default processContacts;
