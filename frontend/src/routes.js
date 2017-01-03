
import React from "react";
import { Router, Route, hashHistory, withRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { CustomTheme } from "./components/CommonUi";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./components/Dashboard";
import { Mission } from "./components/Welcome";
import { About } from "./components/Welcome";
import { Terms } from "./components/Welcome";
import { Faq } from "./components/Welcome";

export default (
    <MuiThemeProvider muiTheme={CustomTheme}>
        <Router history={hashHistory} >
            <Route path="/" component={withRouter(AppShell)} />
            <Route path="/dashboard" component={withRouter(Dashboard)} />
            <Route path="/mission" component={withRouter(Mission)} />
            <Route path="/about" component={withRouter(About)} />
            <Route path="/terms" component={withRouter(Terms)} />
            <Route path="/faq" component={withRouter(Faq)} />
        </Router>
    </MuiThemeProvider>
);
