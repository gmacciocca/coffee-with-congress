"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RefreshIndicator = require("material-ui/RefreshIndicator");

var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressOverlay = function ProgressOverlay(_ref) {
    var showProgress = _ref.showProgress;

    return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("common-ui__overlay-progress", { "common-ui__overlay-progress__hidden": !showProgress }) },
        _react2.default.createElement(
            "div",
            { className: "common-ui__overlay-progress__indicator-container" },
            _react2.default.createElement(_RefreshIndicator2.default, { className: "common-ui__overlay-progress__indicator",
                size: 40,
                left: -20,
                top: -20,
                status: showProgress ? "loading" : "hide"
            })
        )
    );
};

exports.default = ProgressOverlay;