"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _Logo = require("./Logo");

var _Logo2 = _interopRequireDefault(_Logo);

var _Description = require("./Description");

var _Description2 = _interopRequireDefault(_Description);

var _AddressForm = require("./AddressForm");

var _AddressForm2 = _interopRequireDefault(_AddressForm);

var _Footer = require("./Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _PrintStats = require("./PrintStats");

var _PrintStats2 = _interopRequireDefault(_PrintStats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Welcome = function (_React$Component) {
    _inherits(Welcome, _React$Component);

    function Welcome() {
        var _ref;

        _classCallCheck(this, Welcome);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call.apply(_ref, [this].concat(args)));

        _this._userStore = _soloApplication.Application.stores.user;
        _this._contactsStore = _soloApplication.Application.stores.contacts;
        return _this;
    }

    _createClass(Welcome, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._userStore.clear();
            this._contactsStore.clear();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "welcome" },
                _react2.default.createElement(_Logo2.default, null),
                _react2.default.createElement(_Description2.default, null),
                _react2.default.createElement(_AddressForm2.default, { router: this.props.router }),
                _react2.default.createElement(_PrintStats2.default, null),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return Welcome;
}(_react2.default.Component);

exports.default = Welcome;