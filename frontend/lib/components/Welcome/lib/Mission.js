"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _Footer = require("./Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _missionText = require("./missionText");

var _missionText2 = _interopRequireDefault(_missionText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mission = function (_React$Component) {
    _inherits(Mission, _React$Component);

    function Mission() {
        var _ref;

        _classCallCheck(this, Mission);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Mission.__proto__ || Object.getPrototypeOf(Mission)).call.apply(_ref, [this].concat(args)));

        _this.appHeader = _soloApplication.Application.roles.uiAppHeader;
        return _this;
    }

    _createClass(Mission, [{
        key: "render",
        value: function render() {
            var AppHeader = this.appHeader;

            return _react2.default.createElement(
                "div",
                { className: "mission" },
                _react2.default.createElement(AppHeader, {
                    router: this.props.router
                }),
                _react2.default.createElement(
                    "div",
                    { className: "mission__wrapper" },
                    _react2.default.createElement(
                        "h3",
                        null,
                        _soloApplication.Application.localize("footer/missionStatement")
                    ),
                    _react2.default.createElement(_missionText2.default, null)
                ),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return Mission;
}(_react2.default.Component);

exports.default = Mission;