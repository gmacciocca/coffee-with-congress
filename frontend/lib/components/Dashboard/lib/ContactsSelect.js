"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _BaseSelect2 = require("./BaseSelect");

var _BaseSelect3 = _interopRequireDefault(_BaseSelect2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactsSelect = function (_BaseSelect) {
    _inherits(ContactsSelect, _BaseSelect);

    function ContactsSelect() {
        var _ref;

        _classCallCheck(this, ContactsSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ContactsSelect.__proto__ || Object.getPrototypeOf(ContactsSelect)).call.apply(_ref, [this].concat(args)));

        _this._utils = _soloApplication.Application.roles.utils;
        return _this;
    }

    _createClass(ContactsSelect, [{
        key: "roleString",
        value: function roleString(role) {
            return this._utils.camelCaseToWords(role);
        }
    }, {
        key: "partyInitial",
        value: function partyInitial(party) {
            var partyInitials = {
                "Republican": _soloApplication.Application.localize("dashboard/republican"),
                "Democratic": _soloApplication.Application.localize("dashboard/democrat"),
                "I": _soloApplication.Application.localize("dashboard/indpendent")
            };
            var initial = partyInitials[party];
            return initial ? " " + initial : "";
        }
    }, {
        key: "primaryText",
        value: function primaryText(_ref2) {
            var name = _ref2.name,
                party = _ref2.party,
                role = _ref2.role;

            var usableParentWidth = this.props.parendWidth - 24 * 2;
            var nameStyle = {
                width: usableParentWidth / 3 * 2 + "px"
            };
            var roleStyle = {
                width: usableParentWidth / 3 + "px"
            };
            return _react2.default.createElement(
                "div",
                { className: "dashboard__numbered-step-wrapper__contact" },
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__numbered-step-wrapper__contact-name", style: nameStyle },
                    "" + name + this.partyInitial(party)
                ),
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__numbered-step-wrapper__contact-role", style: roleStyle },
                    this.roleString(role)
                )
            );
        }
    }, {
        key: "contactBreaker",
        value: function contactBreaker(typeName) {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__numbered-step-wrapper__contact-breaker" },
                    typeName
                )
            );
        }
    }, {
        key: "contacts",
        value: function contacts(_contacts) {
            var _this2 = this;

            return _contacts && _contacts.map(function (contact) {
                return _react2.default.createElement(_MenuItem2.default, {
                    key: contact.id,
                    value: contact.id,
                    primaryText: _this2.primaryText(contact)
                });
            });
        }
    }, {
        key: "hasLevel",
        value: function hasLevel(level) {
            return Array.isArray(this.props.contacts[level]) && this.props.contacts[level].length;
        }
    }, {
        key: "render",
        value: function render() {
            var selectProps = this.selectProps;
            return _react2.default.createElement(
                _SelectField2.default,
                selectProps,
                this.hasLevel("city") && this.contactBreaker(_soloApplication.Application.localize("dashboard/city")),
                this.hasLevel("city") && this.contacts(this.props.contacts.city),
                this.hasLevel("state") && this.contactBreaker(_soloApplication.Application.localize("dashboard/state")),
                this.hasLevel("state") && this.contacts(this.props.contacts.state),
                this.hasLevel("federal") && this.contactBreaker(_soloApplication.Application.localize("dashboard/federal")),
                this.hasLevel("federal") && this.contacts(this.props.contacts.federal)
            );
        }
    }, {
        key: "labelText",
        get: function get() {
            return _soloApplication.Application.localize("dashboard/contactsLabel");
        }
    }]);

    return ContactsSelect;
}(_BaseSelect3.default);

exports.default = ContactsSelect;