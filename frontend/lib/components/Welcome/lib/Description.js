"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Description = function Description() {
    return _react2.default.createElement(
        "div",
        { className: "welcome__description flow-text" },
        _soloApplication.Application.localize("welcome/welcomeMessage")
    );
};

exports.default = Description;