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
        console.log("name - role", name, role);

        const usableParentWidth = this.props.parendWidth - (24 * 2);
        const nameStyle = {
            width: `${usableParentWidth / 3 * 2}px`
        };
        const roleStyle = {
            width: `${usableParentWidth / 3}px`
        };
        return (
            <div className="dashboard__numbered-step-wrapper__contact">
                <div className="dashboard__numbered-step-wrapper__contact-name" style={nameStyle}>
                    {`${name}${this.partyInitial(party)}`}
                </div>
                <div className="dashboard__numbered-step-wrapper__contact-role" style={roleStyle}>
                    {this.roleString(role)}
                </div>
            </div>
        );
    }

    contactBreaker(typeName) {
        return (
            <div>
                <div className="dashboard__numbered-step-wrapper__contact-breaker" >{typeName}</div>
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

    render() {
        const selectProps = this.selectProps;
        return (
            <SelectField {...selectProps} >
                {this.hasLevel("city") && this.contactBreaker(Application.localize("dashboard/city"))}
                {this.hasLevel("city") && this.contacts(this.props.contacts.city)}
                {this.hasLevel("state") && this.contactBreaker(Application.localize("dashboard/state"))}
                {this.hasLevel("state") && this.contacts(this.props.contacts.state)}
                {this.hasLevel("federal") && this.contactBreaker(Application.localize("dashboard/federal"))}
                {this.hasLevel("federal") && this.contacts(this.props.contacts.federal)}
            </SelectField>
        );
    }
}
