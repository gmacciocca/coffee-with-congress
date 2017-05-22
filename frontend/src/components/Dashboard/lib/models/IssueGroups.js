

export default class IssueGroups {
    constructor(issueGroups) {
        this.load(issueGroups);
    }

    load(issueGroups) {
        this._issueGroups = Array.isArray(issueGroups) ? issueGroups : [];
    }

    get firstIssue() {
        const group = this._issueGroups.find(group => {
            return Array.isArray(group.issues) && group.issues.length;
        });
        return group && group.issues && group.issues[0] && group.issues[0].id;
    }

    getIssueById(issueId) {
        const matchingIssue = this._issueGroups.map(group => {
            return group.issues && group.issues.find(issue => issue.id === issueId);
        }).find(issue => issue);
        return matchingIssue;
    }

    get groups() {
        return this._issueGroups.filter(group => {
            return Array.isArray(group.issues) && group.issues.length;
        }); 
    }
}
