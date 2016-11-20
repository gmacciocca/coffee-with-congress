
import React from "react";
import { Router, Route, hashHistory, withRouter } from "react-router";
import { AppShell } from "./ui/AppShell";

export default (
    <Router history={hashHistory} >
        <Route path="/" component={withRouter(AppShell)} />
    </Router>
);
