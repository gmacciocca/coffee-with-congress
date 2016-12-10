import React from "react";
import classnames from "classnames";
import { Application } from "solo-application";
import { ScreenOverlay } from "../../CommonUi";
import Topics from "./Topics";
import AppBar from "material-ui/AppBar";
import ContactsDrawer from "./ContactsDrawer";
import Paper from "material-ui/Paper";
import Letter from "./Letter";
import FlatButton from "material-ui/FlatButton";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import { OverlayProgress } from "../../CommonUi";

class Print extends React.Component {
    static muiName = "FlatButton";
    render() {
        return (
            <FlatButton {...this.props} label={Application.localize("dashboard/print")} />
        );
    }
}

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon color="#FFFFFF" /></IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
        <MenuItem primaryText="Print" />
    </IconMenu>
);

export default class Dashboard extends React.Component {
    constructor(...args) {
        super(...args);
        this._store = Application.stores.data;
        this._cwcServer = Application.roles.cwcServer;
        this._mediaEvents = Application.roles.mediaEvents;
        this.state = {
            address: null,
            contacts: null,
            topics: null,
            isContactsDrawerOpen: true,
            isSmallScreen: true,
            showOverlay: false,
            paperStyle: {},
            showProgress: false
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
        this._offs.push(this._mediaEvents.onMediumScreen(this.onMediumScreen.bind(this)));
        this._offs.push(this._mediaEvents.onScreenResize(this.onScreenResize.bind(this)));
        this.fetchTopics();
    }

    fetchTopics() {
        this.setState({ showProgress: true });
        this._cwcServer.fetchTopics()
            .then(topics => {
                this.setState({ showProgress: false, topics });
            }, () => {
                this.setState({ showProgress: false });
            });
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
            height: paperHeight,
            width: paperWidth,
            textAlign: "center",
            display: "inline-block",
        };
        this.setState({ paperStyle });
    }

    get letterProps() {
        return {
            addressTo: (<span>This<br />Is<br />The<br />To<br />Address</span>),
            addressFrom: (<span>This<br />Is<br />The<br />From<br />Address</span>),
            date: (<span>This is the date</span>),
            body: (<span>This is the first paragraph of the template body and it is a beauty<br />This is the second paragraph</span>),
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
                            showMenuIconButton={true}
                            onLeftIconButtonTouchTap={this.onMenuIconClick.bind(this)}
                            iconElementRight={<Logged />}
                        />
                        <div className="dashboard__topics-wrapper">
                            <Topics topics={this.state.topics} />
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
                <OverlayProgress showProgress={this.state.showProgress} />
            </div>
        );
    }
}
