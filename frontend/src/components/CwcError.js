import HError from "honest-error";

const CODES = [
    "CWC.ERROR_FETCHING_CONTACTS",
    "CWC.ERROR_FETCHING_ISSUES",
    "CWC.ERROR_FETCHING_TEMPLATES",
    "CWC.ERROR_FETCHING_PRINT_STATS"
];

export default class CwcError extends HError {
    constructor(...args) {
        super(...args);
        this.setCodes(CODES);
    }
}
