"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: "isNullOrUndefined",
        value: function isNullOrUndefined(what) {
            return what === undefined || what === null;
        }
    }, {
        key: "newLineToBr",
        value: function newLineToBr(content) {
            return content.replace(/\n/g, "<br>");
        }
    }, {
        key: "spaceBetween",
        value: function spaceBetween() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var strings = [].concat(args);
            return strings.filter(function (str) {
                return !!str;
            }).join(" ");
        }
    }, {
        key: "camelCaseToWords",
        value: function camelCaseToWords(str) {
            return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function (x) {
                return x[0].toUpperCase() + x.substr(1).toLowerCase();
            }).join(" ");
        }
    }]);

    return Utils;
}();

exports.default = Utils;