"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dialog = require("material-ui/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _soloApplication = require("solo-application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressEditDialog = function (_React$Component) {
    _inherits(AddressEditDialog, _React$Component);

    function AddressEditDialog() {
        _classCallCheck(this, AddressEditDialog);

        return _possibleConstructorReturn(this, (AddressEditDialog.__proto__ || Object.getPrototypeOf(AddressEditDialog)).apply(this, arguments));
    }

    _createClass(AddressEditDialog, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            global.document.addEventListener("keydown", this.keypressHandler.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            global.document.removeEventListener("keydown", this.keypressHandler.bind(this));
        }
    }, {
        key: "keypressHandler",
        value: function keypressHandler(event) {
            if (!this.props.shouldShow) {
                return;
            }
            if (event.keyCode === 27) {
                event.preventDefault();
                event.stopPropagation();
                this.handleCancel();
            } else if (event.keyCode === 13) {
                this.handleSave();
            }
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.props.onCancel();
        }
    }, {
        key: "handleSave",
        value: function handleSave() {
            var address = {
                name: this._form.elements.name.value,
                address: this._form.elements.address.value,
                city: this._form.elements.city.value,
                state: this._form.elements.state.value,
                zip: this._form.elements.zip.value
            };
            this.props.onSave(address);
        }
    }, {
        key: "onSubmit",
        value: function onSubmit() {
            this.handleSave();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/cancel"),
                onTouchTap: this.handleSave.bind(this),
                type: "button"
            }), _react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/save"),
                primary: true,
                keyboardFocused: true,
                onTouchTap: this.handleSave.bind(this),
                type: "submit"
            })];

            return _react2.default.createElement(
                _Dialog2.default,
                {
                    title: _soloApplication.Application.localize("dashboard/addressEditDialogTitle"),
                    actions: actions,
                    modal: true,
                    open: this.props.shouldShow,
                    onRequestClose: this.handleCancel.bind(this),
                    autoScrollBodyContent: true,
                    contentStyle: { width: "100%" }
                },
                _react2.default.createElement(
                    "form",
                    { ref: function ref(_ref) {
                            return _this2._form = _ref;
                        }, onSubmit: this.onSubmit.bind(this) },
                    _react2.default.createElement(
                        "p",
                        null,
                        _react2.default.createElement(_TextField2.default, {
                            name: "name",
                            style: { width: "100%" },
                            floatingLabelText: _soloApplication.Application.localize("dashboard/name"),
                            defaultValue: this.props.address.name
                        })
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        _react2.default.createElement(_TextField2.default, {
                            name: "address",
                            style: { width: "100%" },
                            floatingLabelText: _soloApplication.Application.localize("dashboard/address"),
                            defaultValue: this.props.address.address
                        })
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        _react2.default.createElement(
                            "span",
                            null,
                            _react2.default.createElement(_TextField2.default, {
                                name: "city",
                                style: { width: "50%" },
                                floatingLabelText: _soloApplication.Application.localize("dashboard/city"),
                                defaultValue: this.props.address.city
                            })
                        ),
                        _react2.default.createElement(
                            "span",
                            null,
                            _react2.default.createElement(_TextField2.default, {
                                name: "state",
                                style: { width: "25%" },
                                disabled: true,
                                floatingLabelText: _soloApplication.Application.localize("dashboard/state"),
                                defaultValue: this.props.address.state
                            })
                        ),
                        _react2.default.createElement(
                            "span",
                            null,
                            _react2.default.createElement(_TextField2.default, {
                                name: "zip",
                                style: { width: "30%" },
                                disabled: true,
                                floatingLabelText: _soloApplication.Application.localize("dashboard/zip"),
                                defaultValue: this.props.address.zip
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AddressEditDialog;
}(_react2.default.Component);

exports.default = AddressEditDialog;