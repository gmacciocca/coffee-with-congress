
import React from "react";
import { Router, Route, hashHistory, withRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./components/Dashboard";

export default (
    <MuiThemeProvider>
        <Router history={hashHistory} >
            <Route path="/" component={withRouter(AppShell)} />
            <Route path="/dashboard" component={withRouter(Dashboard)} />
        </Router>
    </MuiThemeProvider>
);
