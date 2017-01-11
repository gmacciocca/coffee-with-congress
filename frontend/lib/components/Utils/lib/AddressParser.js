"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseAddress = require("parse-address");

var _parseAddress2 = _interopRequireDefault(_parseAddress);

var _soloApplication = require("solo-application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var uppercase = function uppercase(string) {
    return string ? string.toUpperCase() : "";
};
var spaceBetween = function spaceBetween() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var strings = [].concat(args);
    return strings.filter(function (str) {
        return !!str;
    }).join(" ");
};

var AddressParser = function () {
    function AddressParser() {
        _classCallCheck(this, AddressParser);
    }

    _createClass(AddressParser, [{
        key: "parse",
        value: function parse(address) {
            return new _Promise(function (resolve, reject) {
                var rawParsed = _parseAddress2.default.parseLocation(address);
                /*
                    city: "new york"
                    number: "415"
                    sec_unit_num: "7G"
                    sec_unit_type: "apt"
                    state: "ny"
                    street: "main"
                    type: "street"
                    zip: "10044"
                */
                var parsedAddress = {
                    address: spaceBetween(rawParsed.number, rawParsed.street, rawParsed.type, rawParsed.sec_unit_type, rawParsed.sec_unit_num),
                    city: rawParsed.city,
                    state: uppercase(rawParsed.state),
                    zip: rawParsed.zip
                };
                if (parsedAddress.state && parsedAddress.zip) resolve(parsedAddress);else reject(new Error(_soloApplication.Application.localize("utils/invalidAddressFormat")));
            });
        }
    }]);

    return AddressParser;
}();

exports.default = AddressParser;