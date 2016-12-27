import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import BaseSelect from "./BaseSelect";

export default class ContactsSelect extends BaseSelect {

    get labelText() {
        return Application.localize("dashboard/contactsLabel");
    }

    primaryText(name, role) {
        const usableParentWidth = this.props.parendWidth - (24 * 2);
        const nameStyle = {
            width: `${usableParentWidth / 3 * 2}px`
        };
        const roleStyle = {
            width: `${usableParentWidth / 3}px`
        };
        return (
            <div className="dashboard__select-wrapper__contact">
                <div className="dashboard__select-wrapper__contact-name" style={nameStyle}>{name}</div>
                <div className="dashboard__select-wrapper__contact-role" style={roleStyle}>{role}</div>
            </div>
        );
    }

    contactBreaker(typeName) {
        return (
            <div>
                <div className="dashboard__select-wrapper__contact-breaker" >{typeName}</div>
            </div>
        );
    }

    contacts(contacts) {
        return contacts && contacts.map(contact => {
            return (
                <MenuItem
                    key={contact.id}
                    value={contact.id}
                    primaryText={this.primaryText(contact.name, contact.role)}
                />
            );
        });
    }

    render() {
        const selectProps = this.selectProps;
        return (
            <SelectField {...selectProps} >
                {this.contactBreaker(Application.localize("dashboard/city"))}
                {this.contacts(this.props.contacts.city)}
                {this.contactBreaker(Application.localize("dashboard/state"))}
                {this.contacts(this.props.contacts.state)}
                {this.contactBreaker(Application.localize("dashboard/federal"))}
                {this.contacts(this.props.contacts.federal)}
            </SelectField>
        );
    }
}
