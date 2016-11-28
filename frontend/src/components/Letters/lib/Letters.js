import React from "react";
import classnames from "classnames";
import { Application } from "solo-application";
import { ScreenOverlay } from "../../CommonUi";
import Topics from "./Topics";
import AppBar from "material-ui/AppBar";
import ContactsDrawer from "./ContactsDrawer";

export default class Letters extends React.Component {
    constructor(...args) {
        super(...args);
        this._store = Application.stores.data;
        this.state = {
            address: null,
            contacts: null,
            isContactsDrawerOpen: true,
            isSmallScreen: true,
            showOverlay: false
        };
        this._offs = [];
    }

    componentWillMount() {
        const address = this._store.get("address");
        const contacts = this._store.get("contacts");
        if (address && contacts) {
            this.setState({ address: address.value, contacts: contacts.value });
        } else {
            this.props.router.push("/");
        }
        this._offs.push(Application.roles.mediaEvents.onMediumScreen(this.onMediumScreen.bind(this)));
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    onMediumScreen({ isLess }) {
        this.setState({
            isContactsDrawerOpen: !isLess,
            isSmallScreen: isLess,
            showOverlay: this.state.showOverlay && isLess
        });
    }

    onMenuIconClick() {
        const isContactsDrawerOpen = !this.state.isContactsDrawerOpen;
        this.setState({
            isContactsDrawerOpen,
            showOverlay: this.state.isSmallScreen && isContactsDrawerOpen
        });
    }

    onOverlayClick() {
        this.setState({
            isContactsDrawerOpen: false,
            showOverlay: false
        });
    }

    clickWasOutsideObject(obj, event) {
        return Object.keys(obj).every(key => !obj[key].contains(event.target));
    }

    onDrawerUpdate(contacts) {
        this._store.set("contacts", { value: contacts });
    }

    get isDrawerOpenAndFixed() {
        return this.state.isContactsDrawerOpen && !this.state.isSmallScreen;
    }

    get appbarSpacerClass() {
        return classnames("letters__appbar-left-spacer",
            { "letters__appbar-left-spacer__showing": this.isDrawerOpenAndFixed });
    }

    get appbarWrapperClass() {
        return classnames("letters__appbar-wrapper",
            { "letters__appbar-wrapper__shifted": this.isDrawerOpenAndFixed });
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="letters">
                <div className="letters__spacer-and-appbar-wrapper">
                    <div className={this.appbarSpacerClass} />
                    <div className={this.appbarWrapperClass}>
                        <AppBar
                            title={Application.localize("welcome/title")}
                            showMenuIconButton={!this.state.isContactsDrawerOpen}
                            onLeftIconButtonTouchTap={this.onMenuIconClick.bind(this)}
                        />
                        <div className="letters__topics-wrapper">
                            <Topics />
                        </div>
                    </div>
                </div>
                <ContactsDrawer
                    isOpen={this.state.isContactsDrawerOpen}
                    clName="letters__representatives-by-level"
                    contacts={this.state.contacts}
                    onUpdate={this.onDrawerUpdate.bind(this)}
                />
                <ScreenOverlay shouldShow={this.state.showOverlay} onClick={this.onOverlayClick.bind(this)} />
            </div>
        );
    }
}
