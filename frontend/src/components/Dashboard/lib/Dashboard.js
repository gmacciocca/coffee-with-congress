import React from "react";
import classnames from "classnames";
import { Application } from "solo-application";
import { ScreenOverlay } from "../../CommonUi";
import Topics from "./Topics";
import AppBar from "material-ui/AppBar";
import ContactsDrawer from "./ContactsDrawer";
import Paper from "material-ui/Paper";
import Letter from "./Letter";

export default class Dashboard extends React.Component {
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
        return classnames("dashboard__appbar-left-spacer",
            { "dashboard__appbar-left-spacer__showing": this.isDrawerOpenAndFixed });
    }

    get appbarPaperWrapperClass() {
        return classnames("dashboard__appbar-paper-wrapper",
            { "dashboard__appbar-paper-wrapper__shifted": this.isDrawerOpenAndFixed });
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
        let paperWidth = 0;
        let paperHeight = (279.4 * availableWidth) / 215.9;
        if (paperHeight <= availableHeight) {
            paperWidth = availableWidth;
        } else {
            paperHeight = availableHeight;
            paperWidth = (215.9 * availableHeight) / 279.4;
        }

        const paperStyle = {
            height: `${paperHeight}px`,
            width: `${paperWidth}px`,
            margin: `0 ${margin}px ${margin}px`,
            textAlign: "center",
            display: "inline-block",
        };
        this.setState({ paperStyle });
    }

    get letterProps() {
        return {
            addressTo: "TO",
            addressFrom: "FROM",
            date: "DATE",
            body: "BODY",
            height: this.state.paperStyle.height,
            width: this.state.paperStyle.width
        };
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="dashboard">
                <div className="dashboard__spacer-and-appbar-paper-wrapper">
                    <div className={this.appbarSpacerClass} />
                    <div ref={this.appBarPaperWrapperRef.bind(this)} className={this.appbarPaperWrapperClass}>
                        <AppBar
                            title={Application.localize("welcome/title")}
                            showMenuIconButton={!this.state.isContactsDrawerOpen}
                            onLeftIconButtonTouchTap={this.onMenuIconClick.bind(this)}
                        />
                        <div className="dashboard__topics-wrapper">
                            <Topics />
                        </div>
                        <div ref={this.paperRef.bind(this)} className="dashboard__paper-wrapper">
                            <Paper style={this.state.paperStyle} zDepth={2}>
                                <Letter {...this.letterProps} />
                            </Paper>
                        </div>
                    </div>
                </div>
                <ContactsDrawer
                    isOpen={this.state.isContactsDrawerOpen}
                    clName="dashboarddashboard__representatives-by-level"
                    contacts={this.state.contacts}
                    onUpdate={this.onDrawerUpdate.bind(this)}
                />
                <ScreenOverlay shouldShow={this.state.showOverlay} onClick={this.onOverlayClick.bind(this)} />
            </div>
        );
    }
}
