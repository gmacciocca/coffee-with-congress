"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprintfJs = require("sprintf-js");

var _soloApplication = require("solo-application");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormatString = function () {
    function FormatString() {
        _classCallCheck(this, FormatString);
    }

    _createClass(FormatString, [{
        key: "formatWithUrlLink",
        value: function formatWithUrlLink(stringKey, urlKey, urlNameKey) {
            var url = _soloApplication.Application.localize(urlKey);
            var urlName = this.encodeURIComponent(_soloApplication.Application.localize(urlNameKey));
            var aTag = "<a href=\"" + url + "\" target=\"_blank\">" + urlName + "</a>";
            return (0, _sprintfJs.sprintf)(_soloApplication.Application.localize(stringKey), aTag);
        }
    }, {
        key: "encodeURIComponent",
        value: function (_encodeURIComponent) {
            function encodeURIComponent(_x) {
                return _encodeURIComponent.apply(this, arguments);
            }

            encodeURIComponent.toString = function () {
                return _encodeURIComponent.toString();
            };

            return encodeURIComponent;
        }(function (str) {
            str = encodeURIComponent(str);
            str = str.replace(/'/g, "%27");
            return str;
        })
    }, {
        key: "formatWithEmailLink",
        value: function formatWithEmailLink(stringKey, emailKey, subject, body) {
            var email = _soloApplication.Application.localize(emailKey);
            subject = this.encodeURIComponent(subject);
            body = this.encodeURIComponent(body);
            var href = "mailto:" + email + "?Subject=" + subject + "&body=" + body;
            var onClickCode = "var e=arguments[0];e.preventDefault();e.stopPropagation();var a=document.createElement('a');a.href ='" + href + "';a.click();";
            var aTag = "<a href=\"#\" onClick=\"" + onClickCode + "\" target='_top'>" + email + "</a>";
            return (0, _sprintfJs.sprintf)(_soloApplication.Application.localize(stringKey), aTag);
        }
    }, {
        key: "format",
        value: function format(stringKey) {
            var message = _soloApplication.Application.localize(stringKey);

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return (0, _sprintfJs.vsprintf)(message, args);
        }
    }]);

    return FormatString;
}();

exports.default = FormatString;