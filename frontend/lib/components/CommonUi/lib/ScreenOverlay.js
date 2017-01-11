"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScreenOverlay = function ScreenOverlay(_ref) {
    var shouldShow = _ref.shouldShow,
        onClick = _ref.onClick;

    return _react2.default.createElement("div", {
        onClick: onClick,
        className: (0, _classnames2.default)("common-ui__screen-overlay", { "common-ui__screen-overlay__hidden": !shouldShow })
    });
};

exports.default = ScreenOverlay;