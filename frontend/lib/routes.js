"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _CommonUi = require("./components/CommonUi");

var _AppShell = require("./components/AppShell");

var _Dashboard = require("./components/Dashboard");

var _Welcome = require("./components/Welcome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _MuiThemeProvider2.default,
    { muiTheme: _CommonUi.CustomTheme },
    _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.hashHistory },
        _react2.default.createElement(_reactRouter.Route, { path: "/", component: (0, _reactRouter.withRouter)(_AppShell.AppShell) }),
        _react2.default.createElement(_reactRouter.Route, { path: "/dashboard", component: (0, _reactRouter.withRouter)(_Dashboard.Dashboard) }),
        _react2.default.createElement(_reactRouter.Route, { path: "/mission", component: (0, _reactRouter.withRouter)(_Welcome.Mission) }),
        _react2.default.createElement(_reactRouter.Route, { path: "/about", component: (0, _reactRouter.withRouter)(_Welcome.About) }),
        _react2.default.createElement(_reactRouter.Route, { path: "/terms", component: (0, _reactRouter.withRouter)(_Welcome.Terms) }),
        _react2.default.createElement(_reactRouter.Route, { path: "/faq", component: (0, _reactRouter.withRouter)(_Welcome.Faq) })
    )
);