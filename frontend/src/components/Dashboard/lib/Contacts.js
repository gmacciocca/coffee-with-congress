import React from "react";
import { Application } from "solo-application";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Select from "./Select";

export default class Contacts extends Select {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange(event, index, value) {
        this.setState({ value });
    }

    get labelText() {
        return Application.localize("dashboard/contactsLabel");
    }

    selectRef(ref) {
        this._ref = ref;
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

    /*
    primaryText(name, role) {
        const usableParentWidth = this.props.parendWidth - (24 * 2);
        const nameStyle = {
            width: usableParentWidth // `${usableParentWidth / 3 * 2}px`
        };
        const roleStyle = {
            width: usableParentWidth // `${usableParentWidth / 3}px`
        };
        return (
            <div className="dashboard__select-wrapper__contact">
                <div className="dashboard__select-wrapper__contact-name" style={nameStyle}>{name}</div>
                <div className="dashboard__select-wrapper__contact-role" style={roleStyle}>{role}</div>
            </div>
        );
    }
    */

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
            <SelectField ref={(ref) => this.selectRef(ref)} {...selectProps} >
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
