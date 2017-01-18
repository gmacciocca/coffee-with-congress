"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrintStats = function (_React$Component) {
    _inherits(PrintStats, _React$Component);

    function PrintStats() {
        var _ref;

        _classCallCheck(this, PrintStats);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = PrintStats.__proto__ || Object.getPrototypeOf(PrintStats)).call.apply(_ref, [this].concat(args)));

        _this._cwcServer = _soloApplication.Application.roles.cwcServer;
        _this._formatString = _soloApplication.Application.roles.formatString;
        _this.state = {
            letterCount: null
        };
        return _this;
    }

    _createClass(PrintStats, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.fetchStatistics();
        }
    }, {
        key: "fetchStatistics",
        value: function fetchStatistics() {
            var _this2 = this;

            this._cwcServer.fetchPrintStatistics().then(function (stats) {
                var letterCount = stats.letter_count;
                _this2.setState({ letterCount: letterCount });
            }, function () {});
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.letterCount ? _react2.default.createElement(
                "div",
                { className: "print-stats" },
                _react2.default.createElement(
                    "div",
                    { className: "print-stats__number" },
                    this.state.letterCount
                ),
                _react2.default.createElement(
                    "div",
                    { className: "print-stats__message" },
                    _soloApplication.Application.localize("welcome/printStatsMessage")
                )
            ) : null;
        }
    }]);

    return PrintStats;
}(_react2.default.Component);

exports.default = PrintStats;