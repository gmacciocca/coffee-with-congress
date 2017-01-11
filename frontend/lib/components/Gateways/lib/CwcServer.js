"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _soloApplication = require("solo-application");

var _CwcError = require("../../CwcError");

var _CwcError2 = _interopRequireDefault(_CwcError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CwcServer = function () {
    function CwcServer(_ref) {
        var networkTransport = _ref.networkTransport;

        _classCallCheck(this, CwcServer);

        this._networkTransport = networkTransport;
    }

    _createClass(CwcServer, [{
        key: "fetchContacts",
        value: function fetchContacts(address) {
            address = encodeURIComponent(address);
            var path = _soloApplication.Application.configuration.origins.cwcServer + "/contacts?address=" + address;
            return this._networkTransport.get(path).catch(function (originalError) {
                throw new _CwcError2.default("CWC.ERROR_FETCHING_CONTACTS", {
                    message: _soloApplication.Application.localize("gateways/invalidAddress"),
                    originalError: originalError
                });
            });
        }
    }, {
        key: "fetchIssues",
        value: function fetchIssues() {
            var path = _soloApplication.Application.configuration.origins.cwcServer + "/issues";
            return this._networkTransport.get(path).catch(function (originalError) {
                throw new _CwcError2.default("CWC.ERROR_FETCHING_ISSUES", {
                    message: originalError.toString(),
                    originalError: originalError
                });
            });
        }
    }, {
        key: "fetchTemplate",
        value: function fetchTemplate(issueId, state, level) {
            var path = _soloApplication.Application.configuration.origins.cwcServer + "/template/issue/" + issueId + "/state/" + state + "/level/" + level;
            return this._networkTransport.get(path).catch(function (originalError) {
                throw new _CwcError2.default("CWC.ERROR_FETCHING_TEMPLATES", {
                    message: originalError.toString(),
                    originalError: originalError
                });
            });
        }
    }, {
        key: "sendPrintStatistics",
        value: function sendPrintStatistics(_ref2) {
            var issueId = _ref2.issueId,
                state = _ref2.state,
                level = _ref2.level;

            debugger;
            var path = _soloApplication.Application.configuration.origins.cwcServer + "/stats";
            var json = { issue: issueId, state: state, level: level };
            return this._networkTransport.send(path, json);
        }
    }, {
        key: "fetchPrintStatistics",
        value: function fetchPrintStatistics() {
            var path = _soloApplication.Application.configuration.origins.cwcServer + "/stats";
            return this._networkTransport.get(path).catch(function (originalError) {
                throw new _CwcError2.default("CWC.ERROR_FETCHING_PRINT_STATS", {
                    message: originalError.toString(),
                    originalError: originalError
                });
            });
        }
    }]);

    return CwcServer;
}();

exports.default = CwcServer;