
import React from "react";
import { Router, Route, hashHistory, withRouter } from "react-router";
import { AppShell } from "./ui/AppShell";
import { Letters } from "./ui/Letters";

export default (
    <Router history={hashHistory} >
        <Route path="/" component={withRouter(AppShell)} />
        <Route path="/letters" component={withRouter(Letters)} />
    </Router>
);
