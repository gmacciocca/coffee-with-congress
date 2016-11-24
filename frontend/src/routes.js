
import React from "react";
import { Router, Route, hashHistory, withRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppShell } from "./components/AppShell";
import { Letters } from "./components/Letters";

export default (
    <MuiThemeProvider>
        <Router history={hashHistory} >
            <Route path="/" component={withRouter(AppShell)} />
            <Route path="/letters" component={withRouter(Letters)} />
        </Router>
    </MuiThemeProvider>
);
