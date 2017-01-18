"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo() {
    var altText = _soloApplication.Application.localize("welcome/title") + " v." + _soloApplication.Application.configuration.clientVersion;
    return _react2.default.createElement(
        "div",
        { className: "welcome__logo" },
        _react2.default.createElement("img", { alt: altText, className: "welcome__logo__img", src: "./images/congress-logo-text.svg" })
    );
};

exports.default = Logo;