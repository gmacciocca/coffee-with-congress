import React from "react";
import { Application } from "solo-application";
import Drawer from "material-ui/Drawer";
import { Card, CardHeader, CardText } from "material-ui/Card";
import Checkbox from "material-ui/Checkbox";

class ContactsDrawer extends React.Component {
    onContactCheck(contact, isInputChecked) {
        contact._uiIsChecked = isInputChecked;
        if (this.props.onUpdate) {
            this.props.onUpdate(this.props.contacts);
        }
    }

    isContactChecked(contact) {
        return contact._uiIsChecked;
    }

    contact(contact) {
        const isChecked = this.isContactChecked(contact);
        return (
            <div key={contact.id}>
                <Checkbox
                    label={`${contact.name} (${contact.role})`}
                    defaultChecked={isChecked}
                    onCheck={(object, isInputChecked) => {
                        this.onContactCheck(contact, isInputChecked);
                    }}
                />
            </div>
        );
    }

    contacts(contacts) {
        return (
            <div>
            {
                contacts.map(contact => {
                    return this.contact(contact);
                })
            }
            </div>
        );
    }

    level(levelName, contacts) {
        if (!contacts || contacts.length === 0){
            return null;
        }
        const titleColor = Application.configuration.colors["main-blue"];
        return (
            <Card>
                <CardHeader
                    title={`${levelName}`}
                    actAsExpander={true}
                    showExpandableButton={true}
                    titleColor={titleColor}
                />
                <CardText
                    expandable={true}
                    children={this.contacts(contacts)} />
            </Card>
        );
    }

    render() {
        return (
            <Drawer open={this.props.isOpen}>
                {this.level(Application.localize("letters/city"), this.props.contacts.city)}
                {this.level(Application.localize("letters/state"), this.props.contacts.state)}
                {this.level(Application.localize("letters/federal"), this.props.contacts.federal)}
            </Drawer>
        );
    }
}

export default ContactsDrawer;
