"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _soloApplication = require("solo-application");

var _levelIds = require("./levelIds");

var _levelIds2 = _interopRequireDefault(_levelIds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Analytics = function () {
    function Analytics(_ref) {
        var utils = _ref.utils;

        _classCallCheck(this, Analytics);

        this._utils = utils;
        ga("set", "appName", _soloApplication.Application.configuration.clientName);
        ga("set", "appVersion", _soloApplication.Application.configuration.clientVersion);
    }

    _createClass(Analytics, [{
        key: "sendAppLoadedEvent",
        value: function sendAppLoadedEvent() {
            ga("send", "event", {
                eventCategory: "application",
                eventAction: "loaded",
                transport: "beacon"
            });
        }
    }, {
        key: "sendPrintEvent",
        value: function sendPrintEvent(_ref2) {
            var issueId = _ref2.issueId,
                state = _ref2.state,
                level = _ref2.level;

            debugger;
            var eventCategory = this._utils.isNullOrUndefined(issueId) ? "no-issue-id" : issueId.toString();
            var eventAction = "print";
            var eventLabel = state;
            var eventValue = _levelIds2.default[level];
            ga("send", "event", {
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: eventLabel,
                eventValue: eventValue,
                transport: "beacon"
            });
        }
    }]);

    return Analytics;
}();

exports.default = Analytics;