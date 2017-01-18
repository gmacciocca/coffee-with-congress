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

var IssuesSelect = function (_BaseSelect) {
    _inherits(IssuesSelect, _BaseSelect);

    function IssuesSelect() {
        _classCallCheck(this, IssuesSelect);

        return _possibleConstructorReturn(this, (IssuesSelect.__proto__ || Object.getPrototypeOf(IssuesSelect)).apply(this, arguments));
    }

    _createClass(IssuesSelect, [{
        key: "render",
        value: function render() {
            var selectProps = this.selectProps;
            return _react2.default.createElement(
                _SelectField2.default,
                selectProps,
                this.props.issues && this.props.issues.map(function (issue) {
                    return _react2.default.createElement(_MenuItem2.default, {
                        key: issue.id,
                        value: issue.id,
                        primaryText: issue.name
                    });
                })
            );
        }
    }, {
        key: "labelText",
        get: function get() {
            return _soloApplication.Application.localize("dashboard/issueLabel");
        }
    }]);

    return IssuesSelect;
}(_BaseSelect3.default);

exports.default = IssuesSelect;