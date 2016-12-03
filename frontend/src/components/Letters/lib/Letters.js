import React from "react";
import classnames from "classnames";
import { Application } from "solo-application";
import { ScreenOverlay } from "../../CommonUi";
import Topics from "./Topics";
import AppBar from "material-ui/AppBar";
import ContactsDrawer from "./ContactsDrawer";
import Paper from "material-ui/Paper";

export default class Letters extends React.Component {
    constructor(...args) {
        super(...args);
        this._store = Application.stores.data;
        this.state = {
            address: null,
            contacts: null,
            isContactsDrawerOpen: true,
            isSmallScreen: true,
            showOverlay: false,
            paperStyle: {}
        };
        this._offs = [];
    }

    componentWillMount() {
        this.updatePaperStyle();
        const address = this._store.get("address");
        const contacts = this._store.get("contacts");
        if (address && contacts) {
            this.setState({ address: address.value, contacts: contacts.value });
        } else {
            this.props.router.push("/");
        }
        this._offs.push(Application.roles.mediaEvents.onMediumScreen(this.onMediumScreen.bind(this)));
        this._offs.push(Application.roles.mediaEvents.onScreenResize(this.onScreenResize.bind(this)));
    }

    componentDidMount() {
        this.updatePaperStyle();
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    onScreenResize() {
        this.updatePaperStyle();
    }

    onMediumScreen({ isLess }) {
        this.setState({
            isContactsDrawerOpen: !isLess,
            isSmallScreen: isLess,
            showOverlay: this.state.showOverlay && isLess
        });
    }

    onMenuIconClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const isContactsDrawerOpen = !this.state.isContactsDrawerOpen;
        this.setState({
            isContactsDrawerOpen,
            showOverlay: this.state.isSmallScreen && isContactsDrawerOpen
        });
    }

    onOverlayClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({
            isContactsDrawerOpen: false,
            showOverlay: false
        });
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

    get appbarPaperWrapperClass() {
        return classnames("letters__appbar-paper-wrapper",
            { "letters__appbar-paper-wrapper__shifted": this.isDrawerOpenAndFixed });
    }

    paperRef(ref) {
        if (this._paperRef !== ref) {
            this._paperRef = ref;
        }
    }

    appBarPaperWrapperRef(ref) {
        if (this._appBarPaperWrapperRef !== ref) {
            this._appBarPaperWrapperRef = ref;
        }
    }

    updatePaperStyle() {
        if (!this._paperRef || !this._appBarPaperWrapperRef) {
            return;
        }

        const margin = 20;
        const availableWidth = this._appBarPaperWrapperRef.offsetWidth /* - this._paperRef.offsetLeft */ - (margin * 2);
        const availableHeight = this._appBarPaperWrapperRef.offsetHeight - this._paperRef.offsetTop - margin;

        // Letter size = 215.9 by 279.4
        // 215.9 : 279.4 = availableWidth : availableHeight

        const tryWidth = (215.9 * availableHeight) / 279.4;
        const tryHeight = (279.4 * availableWidth) / 215.9;

        if (tryWidth <= availableWidth) {
        }

        // const ratio = 215.9 / 279.4;


        const paperWidth = availableWidth;
        const paperHeight = availableHeight;

        const paperStyle = {
            height: `${paperHeight}px`,
            width: `${paperWidth}px`,  // `calc(100% - ${margin * 2}px)`,
            margin: `0 ${margin}px ${margin}px`,
            textAlign: "center",
            display: "inline-block",
        };
        this.setState({ paperStyle });
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="letters">
                <div className="letters__spacer-and-appbar-paper-wrapper">
                    <div className={this.appbarSpacerClass} />
                    <div ref={this.appBarPaperWrapperRef.bind(this)} className={this.appbarPaperWrapperClass}>
                        <AppBar
                            title={Application.localize("welcome/title")}
                            showMenuIconButton={!this.state.isContactsDrawerOpen}
                            onLeftIconButtonTouchTap={this.onMenuIconClick.bind(this)}
                        />
                        <div className="letters__topics-wrapper">
                            <Topics />
                        </div>
                        <div ref={this.paperRef.bind(this)} className="letters__paper-wrapper">
                            <Paper style={this.state.paperStyle} zDepth={2} />
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
