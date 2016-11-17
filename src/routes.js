
import React from "react";
import { Router, Route, hashHistory, withRouter } from "react-router";
import Welcome from "./ui/Welcome";
// import Main from "./Main";

export default (
    <Router history={hashHistory} >
        <Route path="/" component={withRouter(Welcome)} />
    </Router>
);
