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

var _Checkbox = require("material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _sprintfJs = require("sprintf-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrintWarningDialog = function (_React$Component) {
    _inherits(PrintWarningDialog, _React$Component);

    function PrintWarningDialog() {
        var _ref;

        _classCallCheck(this, PrintWarningDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = PrintWarningDialog.__proto__ || Object.getPrototypeOf(PrintWarningDialog)).call.apply(_ref, [this].concat(args)));

        _this._events = _soloApplication.Application.roles.events;
        _this._formatString = _soloApplication.Application.roles.formatString;
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

    _createClass(PrintWarningDialog, [{
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
        key: "handleOk",
        value: function handleOk() {
            this.props.onOk(this._isDoNotShowAgaiChecked);
        }
    }, {
        key: "onDoNotShowAgaiCheck",
        value: function onDoNotShowAgaiCheck(event, isInputChecked) {
            this._isDoNotShowAgaiChecked = isInputChecked;
        }
    }, {
        key: "render",
        value: function render() {
            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/cancel"),
                primary: false,
                onTouchTap: this.handleCancel.bind(this),
                type: "button"
            }), _react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/print"),
                primary: true,
                keyboardFocused: true,
                onTouchTap: this.handleOk.bind(this),
                type: "submit"
            })];

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: _soloApplication.Application.localize("dashboard/printWarningDialogTitle"),
                        actions: actions,
                        modal: true,
                        open: this.props.shouldShow,
                        onRequestClose: this.handleCancel.bind(this),
                        contentStyle: { width: "100%", height: "100%" },
                        actionsContainerClassName: "dashboard__dialog-buttons"
                    },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "h5",
                            null,
                            _soloApplication.Application.localize("dashboard/gotStamps")
                        ),
                        _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.stampsHtmlString } }),
                        _react2.default.createElement(
                            "h5",
                            null,
                            _soloApplication.Application.localize("dashboard/needEnvelope")
                        ),
                        _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.envelopesHtmlString } }),
                        _react2.default.createElement(
                            "h5",
                            null,
                            _soloApplication.Application.localize("dashboard/checkPrinter")
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            _soloApplication.Application.localize("dashboard/printerInstructions")
                        ),
                        _react2.default.createElement(
                            "h5",
                            null,
                            _soloApplication.Application.localize("dashboard/grabAPen")
                        )
                    ),
                    _react2.default.createElement(_Checkbox2.default, {
                        onCheck: this.onDoNotShowAgaiCheck.bind(this),
                        label: _soloApplication.Application.localize("dashboard/doNotShowAgain")
                    })
                )
            );
        }
    }, {
        key: "stampsHtmlString",
        get: function get() {
            return this._formatString.formatWithUrlLink("dashboard/stampsInstructions", "dashboard/stampsLink", "dashboard/stampsLinkName");
        }
    }, {
        key: "envelopesHtmlString",
        get: function get() {
            return this._formatString.formatWithUrlLink("dashboard/envelopeInstructions", "dashboard/envelopeLink", "dashboard/envelopeLinkName");
        }
    }]);

    return PrintWarningDialog;
}(_react2.default.Component);

exports.default = PrintWarningDialog;