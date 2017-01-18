"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _soloApplication = require("solo-application");

var _letterConstants = require("./letterConstants");

var _letterConstants2 = _interopRequireDefault(_letterConstants);

var _sprintfJs = require("sprintf-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Letter = function (_React$Component) {
    _inherits(Letter, _React$Component);

    function Letter() {
        var _ref;

        _classCallCheck(this, Letter);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Letter.__proto__ || Object.getPrototypeOf(Letter)).call.apply(_ref, [this].concat(args)));

        _this._formatString = _soloApplication.Application.roles.formatString;
        _this._utils = _soloApplication.Application.roles.utils;
        return _this;
    }

    _createClass(Letter, [{
        key: "userNameForLetter",
        value: function userNameForLetter(address) {
            return address.name ? _react2.default.createElement(
                "div",
                null,
                address.name
            ) : _react2.default.createElement(
                "div",
                { className: "letter__contents__replace-string" },
                _soloApplication.Application.localize("dashboard/pleaseEnterYourNameHere")
            );
        }
    }, {
        key: "render",
        value: function render() {
            var styles = this.styles;
            return _react2.default.createElement(
                "div",
                { className: "letter", style: styles.letterStyle },
                _react2.default.createElement(
                    "div",
                    { className: "letter__contents", style: styles.letterContentStyle },
                    this.addressFrom,
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("br", null),
                    this.date,
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("br", null),
                    this.addressTo,
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("br", null),
                    this.template
                )
            );
        }
    }, {
        key: "addressFrom",
        get: function get() {
            var addressFrom = this.props.addressFrom;

            return addressFrom ? _react2.default.createElement(
                "div",
                { className: "letter__contents__editable", onClick: this.props.onEditUser },
                this.userNameForLetter(addressFrom),
                addressFrom.address,
                _react2.default.createElement("br", null),
                "" + this._utils.spaceBetween(addressFrom.city, addressFrom.state, addressFrom.zip),
                _react2.default.createElement("br", null)
            ) : null;
        }
    }, {
        key: "date",
        get: function get() {
            var date = new Date();
            var momentDate = new _moment2.default(date);
            return _react2.default.createElement(
                "time",
                { tabIndex: "0", dateTime: momentDate.toISOString().substr(0, 10) },
                momentDate.format("LL"),
                _react2.default.createElement("br", null)
            );
        }
    }, {
        key: "addressTo",
        get: function get() {
            var addressTo = this.props.addressTo;

            return addressTo ? _react2.default.createElement(
                "div",
                null,
                addressTo.name,
                _react2.default.createElement("br", null),
                "" + this._utils.spaceBetween(addressTo.address1, addressTo.address2),
                _react2.default.createElement("br", null),
                "" + this._utils.spaceBetween(addressTo.city, addressTo.state, addressTo.zip_code),
                _react2.default.createElement("br", null),
                addressTo.phones ? _react2.default.createElement(
                    "span",
                    null,
                    addressTo.phones,
                    _react2.default.createElement("br", null)
                ) : null,
                addressTo.emails ? _react2.default.createElement(
                    "span",
                    null,
                    addressTo.emails,
                    _react2.default.createElement("br", null)
                ) : null
            ) : _react2.default.createElement(
                "div",
                { className: "letter__contents__replace-string" },
                _soloApplication.Application.localize("dashboard/pleaseSelectARepresentative")
            );
        }
    }, {
        key: "noTemplateMessage",
        get: function get() {
            if (this.props.fetchingData) {
                return "";
            }
            var subject = (0, _sprintfJs.sprintf)(_soloApplication.Application.localize("dashboard/noTemplageEmailSubject"), this.props.issueName, this.props.state, this.props.level);
            var body = _soloApplication.Application.localize("dashboard/noTemplageEmailBody");
            return this._formatString.formatWithEmailLink("dashboard/noTemplageMessage", "dashboard/noTemplageEmailAddress", subject, body);
        }
    }, {
        key: "template",
        get: function get() {
            var templateContent = this.props.templateContent;

            return templateContent ? _react2.default.createElement("div", {
                className: "letter__contents__editable",
                dangerouslySetInnerHTML: { __html: this._utils.newLineToBr(templateContent) },
                onClick: this.props.onEditTemplate
            }) : _react2.default.createElement("div", {
                onClick: this.props.onEditTemplate,
                dangerouslySetInnerHTML: { __html: this._utils.newLineToBr(this.noTemplateMessage) },
                className: "letter__contents__editable letter__contents__replace-string"
            });
        }
    }, {
        key: "styles",
        get: function get() {
            var width = this.props.forPrint ? _letterConstants2.default.letterWidthIn : _letterConstants2.default.letterWidthPx;
            var height = this.props.forPrint ? _letterConstants2.default.letterHeightIn : _letterConstants2.default.letterHeightPx;

            var fontSize = height / _letterConstants2.default.letterLinesPerPage;
            var lineHeight = height / _letterConstants2.default.letterLinesPerPage;
            var letterMargin = _letterConstants2.default.letterMarginInLines * lineHeight;

            //const scale = 0.3; //0.5; // (wrapperSize.width / contentSize.width);
            var scale = !this.props.forPrint ? {
                transform: "scale(" + this.props.width / width + ")",
                transformOrigin: "0 0 0"
            } : {};

            var unit = this.props.forPrint ? "in" : "px";

            return {
                letterStyle: _extends({
                    width: "" + width + unit,
                    height: "" + height + unit,
                    fontSize: "" + fontSize + unit,
                    lineHeight: "" + lineHeight + unit,
                    fontWeight: "lighter"
                }, scale),
                letterContentStyle: {
                    width: "" + (width - letterMargin) + unit,
                    height: "" + (height - letterMargin) + unit
                }
            };
        }
    }]);

    return Letter;
}(_react2.default.Component);

exports.default = Letter;