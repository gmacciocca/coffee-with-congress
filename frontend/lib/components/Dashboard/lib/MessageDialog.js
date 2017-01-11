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

var _RaisedButton = require("material-ui/RaisedButton");

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _soloApplication = require("solo-application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageDialog = function (_React$Component) {
    _inherits(MessageDialog, _React$Component);

    function MessageDialog() {
        var _ref;

        _classCallCheck(this, MessageDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = MessageDialog.__proto__ || Object.getPrototypeOf(MessageDialog)).call.apply(_ref, [this].concat(args)));

        _this._events = _soloApplication.Application.roles.events;
        _this._offs = [];
        return _this;
    }

    _createClass(MessageDialog, [{
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
            if (!this.props.open) {
                return;
            }
            if (event.keyCode === 27) {
                // event.preventDefault();
                // //event.stopPropagation();
                this.handleCancel();
                return { stopEventPropagation: true };
            }
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({ open: false });
            this.props.onCancel && this.props.onCancel();
            this.props.onClose && this.props.onClose();
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            this.setState({ open: false });
            this.props.onOk && this.props.onOk();
            this.props.onClose && this.props.onClose();
        }
    }, {
        key: "render",
        value: function render() {
            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/cancel"),
                primary: true,
                onTouchTap: this.handleCancel.bind(this)
            }), _react2.default.createElement(_FlatButton2.default, {
                label: _soloApplication.Application.localize("dashboard/ok"),
                primary: true,
                keyboardFocused: true,
                onTouchTap: this.handleOk.bind(this)
            })];

            var style = {
                zIndex: 100
            };

            return _react2.default.createElement(
                "div",
                { style: style },
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: this.props.title,
                        actions: actions,
                        modal: false,
                        open: this.props.open,
                        onRequestClose: this.handleClose
                    },
                    this.props.text
                )
            );
        }
    }]);

    return MessageDialog;
}(_react2.default.Component);

exports.default = MessageDialog;