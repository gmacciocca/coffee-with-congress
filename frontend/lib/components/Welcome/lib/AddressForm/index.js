"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _CommonUi = require("../../../CommonUi");

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATE_INITIALS = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"];

var isZipValid = function isZipValid(zipCode) {
    return typeof zipCode === "string" && !isNaN(zipCode) && zipCode.length === 5;
};

var AddressForm = function (_React$Component) {
    _inherits(AddressForm, _React$Component);

    function AddressForm() {
        var _ref;

        _classCallCheck(this, AddressForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = AddressForm.__proto__ || Object.getPrototypeOf(AddressForm)).call.apply(_ref, [this].concat(args)));

        _this._cwcServer = _soloApplication.Application.roles.cwcServer;
        _this._userStore = _soloApplication.Application.stores.user;
        _this._contactsStore = _soloApplication.Application.stores.contacts;
        _this.state = {
            disableContinueButton: true,
            disableInputs: false,
            showProgress: false,
            errorText: null,
            stateCode: "",
            zipCode: "",
            streetAddress: "",
            city: ""
        };
        return _this;
    }

    _createClass(AddressForm, [{
        key: "filterContacts",
        value: function filterContacts(contacts) {
            var filtered = {};
            Object.keys(contacts).map(function (level) {
                if (_soloApplication.Application.configuration.officialLevels.find(function (officialLevel) {
                    return officialLevel === level;
                })) {
                    filtered[level] = contacts[level];
                }
            });
            return filtered;
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(ev) {
            var _this2 = this;

            ev.preventDefault();
            this.setState({ showProgress: true });
            this.disableInputs(true);

            var address = {
                address: this.state.streetAddress,
                city: this.state.city,
                state: this.state.stateCode,
                zip: this.state.zipCode
            };

            var addressString = this.state.streetAddress + " " + this.state.city + " " + this.state.stateCode + " " + this.state.zipCode;

            this._cwcServer.fetchContacts(addressString).then(function (contacts) {
                contacts = _this2.filterContacts(contacts);
                _this2._userStore.set("address", _extends({}, address));
                _this2._contactsStore.set("contacts", _extends({}, contacts));
                _this2.props.router.push("/dashboard");
            }, function (err) {
                _this2.setState({ showProgress: false, errorText: err.message });
                _this2.disableInputs(false);
            });
        }
    }, {
        key: "onStreetAddressChange",
        value: function onStreetAddressChange(event, streetAddress) {
            this.setState({
                streetAddress: streetAddress,
                disableContinueButton: !streetAddress,
                errorText: null
            });
        }
    }, {
        key: "onCityChange",
        value: function onCityChange(event, city) {
            this.setState({
                city: city,
                disableContinueButton: !city,
                errorText: null
            });
        }
    }, {
        key: "onZipChange",
        value: function onZipChange(event, zipCode) {
            zipCode = isNaN(zipCode) || zipCode.length > 5 ? this.state.zipCode : zipCode;
            this.setState({
                zipCode: zipCode,
                disableContinueButton: !this.state.stateCode || !isZipValid(zipCode),
                errorText: null
            });
        }
    }, {
        key: "onStateChange",
        value: function onStateChange(event, index, stateCode) {
            this.setState({
                stateCode: stateCode,
                disableContinueButton: !stateCode || !isZipValid(this.state.zipCode),
                errorText: null
            });
        }
    }, {
        key: "disableInputs",
        value: function disableInputs(_disableInputs) {
            this.setState({ disableInputs: _disableInputs });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "welcome__address-form" },
                _react2.default.createElement(
                    "form",
                    { onSubmit: this.onSubmit.bind(this) },
                    _react2.default.createElement(
                        "div",
                        { className: "cwc-screen-medium-and-up" },
                        _react2.default.createElement(
                            "div",
                            { className: "welcome__address" },
                            this.streetAddress,
                            this.city,
                            this.stateSelect,
                            this.inputZip
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "cwc-screen-small-and-down" },
                        _react2.default.createElement(
                            "div",
                            { className: "welcome__address" },
                            this.streetAddress
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "welcome__address" },
                            this.city,
                            this.stateSelect,
                            this.inputZip
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "welcome__error-button" },
                        this.errorString,
                        this.continueButton
                    )
                ),
                _react2.default.createElement(_CommonUi.ProgressOverlay, { showProgress: this.state.showProgress })
            );
        }
    }, {
        key: "streetAddress",
        get: function get() {
            var _this3 = this;

            var props = {
                onChange: this.onStreetAddressChange.bind(this),
                //floatingLabelFixed: true,
                floatingLabelText: _soloApplication.Application.localize("welcome/streetAddressLabel"),
                //hintText: Application.localize("welcome/streetAddressHint"),
                disabled: this.state.disableInputs,
                value: this.state.streetAddress,
                style: {
                    width: "190px"
                }
            };

            return _react2.default.createElement(
                "div",
                { className: "welcome__address__field" },
                _react2.default.createElement(_TextField2.default, _extends({
                    ref: function ref(_ref2) {
                        return _this3._streetAddress = _ref2;
                    }
                }, props))
            );
        }
    }, {
        key: "city",
        get: function get() {
            var _this4 = this;

            var props = {
                onChange: this.onCityChange.bind(this),
                //floatingLabelFixed: true,
                floatingLabelText: _soloApplication.Application.localize("welcome/cityLabel"),
                //hintText: Application.localize("welcome/cityHint"),
                disabled: this.state.disableInputs,
                value: this.state.city,
                style: {
                    width: "100px"
                }
            };

            return _react2.default.createElement(
                "div",
                { className: "welcome__address__field" },
                _react2.default.createElement(_TextField2.default, _extends({
                    ref: function ref(_ref3) {
                        return _this4._streetAddress = _ref3;
                    }
                }, props))
            );
        }
    }, {
        key: "stateSelect",
        get: function get() {
            var _this5 = this;

            var props = {
                style: {
                    tabIndex: "0",
                    width: "75px"
                },
                autoFocus: true,
                autoWidth: true,
                onChange: this.onStateChange.bind(this),
                //floatingLabelFixed: true,
                floatingLabelText: _soloApplication.Application.localize("welcome/stateLabel"),
                //hintText: Application.localize("welcome/stateHint"),
                value: this.state.stateCode
            };

            return _react2.default.createElement(
                "div",
                { className: "welcome__address__field" },
                _react2.default.createElement(
                    _SelectField2.default,
                    _extends({ ref: function ref(_ref4) {
                            return _this5._state = _ref4;
                        } }, props),
                    STATE_INITIALS.map(function (state) {
                        return _react2.default.createElement(_MenuItem2.default, {
                            key: state,
                            value: state,
                            primaryText: state
                        });
                    })
                )
            );
        }
    }, {
        key: "inputZip",
        get: function get() {
            var _this6 = this;

            var props = {
                onChange: this.onZipChange.bind(this),
                //floatingLabelFixed: true,
                floatingLabelText: _soloApplication.Application.localize("welcome/zipCodeLabel"),
                //hintText: Application.localize("welcome/zipCodeHint"),
                disabled: this.state.disableInputs,
                value: this.state.zipCode,
                style: {
                    width: "80px"
                },
                inputStyle: {
                    type: "number",
                    maxlength: 5
                }
            };

            return _react2.default.createElement(
                "div",
                { className: "welcome__address__field" },
                _react2.default.createElement(_TextField2.default, _extends({
                    ref: function ref(_ref5) {
                        return _this6._zip = _ref5;
                    }
                }, props))
            );
        }
    }, {
        key: "continueButton",
        get: function get() {
            var props = {
                type: "submit",
                disabled: this.state.disableContinueButton || this.state.disableInputs,
                label: _soloApplication.Application.localize("welcome/continue"),
                primary: true
            };
            return _react2.default.createElement(_FlatButton2.default, props);
        }
    }, {
        key: "errorString",
        get: function get() {
            return this.state.errorText ? _react2.default.createElement(
                "div",
                { className: "welcome__error-string" },
                this.state.errorText
            ) : null;
        }
    }]);

    return AddressForm;
}(_react2.default.Component);

exports.default = AddressForm;