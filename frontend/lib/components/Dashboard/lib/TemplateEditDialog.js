"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _Dialog = require("material-ui/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _MessageDialog = require("./MessageDialog");

var _MessageDialog2 = _interopRequireDefault(_MessageDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TemplateEditDialog = function (_React$Component) {
    _inherits(TemplateEditDialog, _React$Component);

    function TemplateEditDialog() {
        var _ref;

        _classCallCheck(this, TemplateEditDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = TemplateEditDialog.__proto__ || Object.getPrototypeOf(TemplateEditDialog)).call.apply(_ref, [this].concat(args)));

        _this._events = _soloApplication.Application.roles.events;
        _this._offs = [];
        _this.state = {
            openMessageDialog: false,
            messageDialogText: null,
            messageDialogTitle: null,
            onMessageDialogOk: null,
            onMessageDialogCancel: null
        };
        return _this;
    }

    _createClass(TemplateEditDialog, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._offs.push(this._events.on("cwc:keydown", this.keypressHandler.bind(this)));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._offs.forEach(function (off) {
                return off();
            });
        }
    }, {
        key: "keypressHandler",
        value: function keypressHandler(event) {
            if (!this.props.shouldShow || this.state.openMessageDialog) {
                return false;
            }
            if (event.keyCode === 27) {
                event.preventDefault();
                event.stopPropagation();
                this.handleCancel();
                return false;
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
            this.props.onSave(this._form.elements.templateContent.value);
        }
    }, {
        key: "onMessageDialogClose",
        value: function onMessageDialogClose() {
            this.setState({
                openMessageDialog: false,
                messageDialogText: null,
                messageDialogTitle: null,
                onMessageDialogOk: null,
                onMessageDialogCancel: null
            });
        }
    }, {
        key: "handleRestoreTemplate",
        value: function handleRestoreTemplate() {
            var _this2 = this;

            this.setState({
                openMessageDialog: true,
                messageDialogText: _soloApplication.Application.localize("dashboard/restoreConfirmationText"),
                messageDialogTitle: _soloApplication.Application.localize("dashboard/restoreConfirmationTitle"),
                onMessageDialogOk: function onMessageDialogOk() {
                    _this2.props.onRestore();
                    _this2.onMessageDialogClose();
                    _this2.handleCancel();
                },
                onMessageDialogCancel: function onMessageDialogCancel() {
                    _this2.onMessageDialogClose();
                }
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit() {
            this.handleSave();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/restoreTemplate"),
                onTouchTap: this.handleRestoreTemplate.bind(this),
                type: "button"
            }), _react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/cancel"),
                onTouchTap: this.handleCancel.bind(this),
                type: "button"
            }), _react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/save"),
                primary: true,
                keyboardFocused: true,
                onTouchTap: this.handleSave.bind(this),
                type: "submit"
            })];

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: _soloApplication.Application.localize("dashboard/templateEditDialogTitle"),
                        actions: actions,
                        modal: true,
                        open: this.props.shouldShow,
                        onRequestClose: this.handleCancel.bind(this),
                        contentStyle: { width: "100%", height: "100%" }
                    },
                    _react2.default.createElement(
                        "form",
                        { ref: function ref(_ref2) {
                                return _this3._form = _ref2;
                            }, onSubmit: this.onSubmit.bind(this) },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(_TextField2.default, {
                                name: "templateContent",
                                style: { width: "100%" },
                                hintText: _soloApplication.Application.localize("dashboard/template"),
                                defaultValue: this.props.templateContent,
                                multiLine: true,
                                rows: 30,
                                rowsMax: 30
                            })
                        )
                    ),
                    _react2.default.createElement(_MessageDialog2.default, {
                        open: this.state.openMessageDialog,
                        text: this.state.messageDialogText,
                        title: this.state.messageDialogTitle,
                        onOk: this.state.onMessageDialogOk,
                        onCancel: this.state.onMessageDialogCancel,
                        onClose: this.onMessageDialogClose.bind(this)
                    })
                )
            );
        }
    }]);

    return TemplateEditDialog;
}(_react2.default.Component);

exports.default = TemplateEditDialog;