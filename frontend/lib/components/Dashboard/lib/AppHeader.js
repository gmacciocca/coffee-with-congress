"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _AppBar = require("material-ui/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppHeader = function (_React$Component) {
    _inherits(AppHeader, _React$Component);

    function AppHeader() {
        var _ref;

        _classCallCheck(this, AppHeader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = AppHeader.__proto__ || Object.getPrototypeOf(AppHeader)).call.apply(_ref, [this].concat(args)));

        _this._utils = _soloApplication.Application.roles.utils;
        _this.state = {};
        return _this;
    }

    _createClass(AppHeader, [{
        key: "goHome",
        value: function goHome() {
            this.props.router.push("/");
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_AppBar2.default, {
                iconElementLeft: this.clickableLogo,
                iconElementRight: this.printElement
            });
        }
    }, {
        key: "printElement",
        get: function get() {
            return this.props.onPrint ? _react2.default.createElement(_FlatButton2.default, {
                onTouchTap: this.props.onPrint,
                label: _soloApplication.Application.localize("dashboard/print")
            }) : null;
        }
    }, {
        key: "clickableLogo",
        get: function get() {
            return _react2.default.createElement(
                "div",
                { className: "dashboard__logo" },
                _react2.default.createElement("img", { onClick: this.goHome.bind(this),
                    className: "dashboard__logo__img", src: "./images/congress-white.svg" })
            );
        }
    }]);

    return AppHeader;
}(_react2.default.Component);

exports.default = AppHeader;