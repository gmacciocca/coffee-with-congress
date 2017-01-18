"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _honestError = require("honest-error");

var _honestError2 = _interopRequireDefault(_honestError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODES = ["CWC.ERROR_FETCHING_CONTACTS", "CWC.ERROR_FETCHING_ISSUES", "CWC.ERROR_FETCHING_TEMPLATES", "CWC.ERROR_FETCHING_PRINT_STATS"];

var CwcError = function (_HError) {
    _inherits(CwcError, _HError);

    function CwcError() {
        var _ref;

        _classCallCheck(this, CwcError);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = CwcError.__proto__ || Object.getPrototypeOf(CwcError)).call.apply(_ref, [this].concat(args)));

        _this.setCodes(CODES);
        return _this;
    }

    return CwcError;
}(_honestError2.default);

exports.default = CwcError;