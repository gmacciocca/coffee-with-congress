import React from "react";
import classnames from "classnames";
import { Application } from "solo-application";
import Topics from "./Topics";
import Contacts from "./Contacts";
import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import Letter from "./Letter";
import FlatButton from "material-ui/FlatButton";
import { ProgressOverlay } from "../../CommonUi";
import NumberInCircle from "./NumberInCircle";

class Print extends React.Component {
    static muiName = "FlatButton";
    render() {
        return (
            <FlatButton
                {...this.props}
                label={Application.localize("dashboard/print")} 
            />
        );
    }
}

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
            paperStyle: {},
            showProgress: false
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
        this.setState({ paperStyle, availableWidth });
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

    setComponentParent(ref) {
        if (ref && this.state.componentParentWidth !== ref.offsetWidth) {
            this.setState({ componentParentWidth: ref.offsetWidth });
        }
    }

    select({ Component, props, number }) {
        return (
            <div className="dashboard__select-wrapper">
                <div className="dashboard__select-wrapper__number">
                    <NumberInCircle size="20" number={number} />
                </div>
                <div ref={this.setComponentParent.bind(this)} className="dashboard__select-wrapper__select">
                    <Component parendWidth={this.state.componentParentWidth} {...props} />
                </div>
            </div>
        );
    }

    get topicsSelect() {
        return this.select({
            Component: Topics,
            props: {
                topics: this.state.topics,
                maxWidth: this.state.availableWidth
            },
            number: 1
        });
    }

    get contactsSelect() {
        return this.select({
            Component: Contacts,
            props: {
                contacts: this.state.contacts,
                maxWidth: this.state.availableWidth
            },
            number: 2
        });
    }

    render() {
        if (!this.state.address || !this.state.contacts) {
            return null;
        }
        return (
            <div className="dashboard">
                <div className="dashboard__spacer-and-appbar-paper-wrapper">
                    <div className={this.appbarSpacerClass} />
                    <div ref={this.appBarPaperWrapperRef.bind(this)} className="dashboard__appbar-paper-wrapper">
                        <AppBar
                            showMenuIconButton={false}
                            title={Application.localize("welcome/title")}
                            iconElementRight={<Print />}
                        />
                        {this.topicsSelect}
                        {this.contactsSelect}
                        <div ref={this.paperRef.bind(this)} className="dashboard__paper-wrapper">
                            <Paper style={this.state.paperStyle} zDepth={2}>
                                <Letter {...this.letterProps} />
                            </Paper>
                        </div>
                    </div>
                </div>
                <ProgressOverlay showProgress={this.state.showProgress} />
            </div>
        );
    }
}
