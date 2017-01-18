"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberInCircle = function NumberInCircle(_ref) {
    var number = _ref.number;

    return _react2.default.createElement(
        "div",
        { className: "number-in-circle" },
        number
    );
};

exports.default = NumberInCircle;