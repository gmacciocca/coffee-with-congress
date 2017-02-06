import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import BaseSelect from "./BaseSelect";

export default class ContactsSelect extends BaseSelect {
    constructor(...args) {
        super(...args);
        this._utils = Application.roles.utils;
    }

    roleString(role) {
        return this._utils.camelCaseToWords(role);
    }

    get labelText() {
        return Application.localize("dashboard/contactsLabel");
    }

    partyInitial(party) {
        const partyInitials = {
            "Republican" : Application.localize("dashboard/republican"),
            "Democratic" : Application.localize("dashboard/democrat"),
            "I" : Application.localize("dashboard/indpendent")
        };
        const initial = partyInitials[party];
        return initial ? ` ${initial}` : "";
    }

    primaryText({ name, party, role }) {
        const usableParentWidth = this.props.parendWidth - (24 * 2);
        const nameStyle = {
            width: `${usableParentWidth / 3 * 2}px`
        };
        const roleStyle = {
            width: `${usableParentWidth / 3}px`
        };
        return (
            <div className="dashboard__numbered-step__contact">
                <div className="dashboard__numbered-step__contact-name" style={nameStyle}>
                    {`${name}${this.partyInitial(party)}`}
                </div>
                <div className="dashboard__numbered-step__contact-role" style={roleStyle}>
                    {this.roleString(role)}
                </div>
            </div>
        );
    }

    contactBreaker(typeName) {
        return (
            <div>
                <div className="dashboard__numbered-step__contact-breaker" >{typeName}</div>
            </div>
        );
    }

    contacts(contacts) {
        return contacts && contacts.map(contact => {
            return (
                <MenuItem
                    key={contact.id}
                    value={contact.id}
                    primaryText={this.primaryText(contact)}
                />
            );
        });
    }

    hasLevel(level) {
        return Array.isArray(this.props.contacts[level]) && this.props.contacts[level].length;
    }

    contactsByDisplayLevel(displayLevel) {
        const contacts = [];
        Object.keys(this.props.contacts).forEach(level => {
            this.props.contacts[level].forEach(contact => {
                if (contact.displayLevel === displayLevel) {
                    contacts.push(contact);
                }
            });
        });
        return contacts;
    }

    render() {
        const selectProps = this.selectProps;
        const cityContacts = this.contactsByDisplayLevel("city");
        const stateContacts = this.contactsByDisplayLevel("state");
        const federalContacts = this.contactsByDisplayLevel("federal");
        const leadershipContacts = this.contactsByDisplayLevel("leadership");

        return (
            <SelectField {...selectProps} >
                {cityContacts.length && this.contactBreaker(Application.localize("dashboard/city"))}
                {cityContacts.length && this.contacts(cityContacts)}
                {stateContacts.length && this.contactBreaker(Application.localize("dashboard/state"))}
                {stateContacts.length && this.contacts(stateContacts)}
                {federalContacts.length && this.contactBreaker(Application.localize("dashboard/federal"))}
                {federalContacts.length && this.contacts(federalContacts)}
                {leadershipContacts.length && this.contactBreaker(Application.localize("dashboard/leadership"))}
                {leadershipContacts.length && this.contacts(leadershipContacts)}
            </SelectField>
        );
    }
}
