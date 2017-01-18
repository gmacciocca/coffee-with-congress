"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _soloApplication = require("solo-application");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uppercase = function uppercase(string) {
    return string ? string.toUpperCase() : "";
};

var ZipcodeValidation = function () {
    function ZipcodeValidation(_ref) {
        var networkTransport = _ref.networkTransport;

        _classCallCheck(this, ZipcodeValidation);

        this._networkTransport = networkTransport;
    }

    _createClass(ZipcodeValidation, [{
        key: "addressFromZipcode",
        value: function addressFromZipcode(zipCode) {
            var resource = "https://api.zippopotam.us/us/" + zipCode;
            return this._networkTransport.getJson(resource).then(function (response) {
                if (response && Array.isArray(response.places) && response.places.length) {
                    var place = response.places[0];
                    var city = place["place name"];
                    var state = place["state abbreviation"];
                    if (city && state) {
                        var parsedAddress = {
                            address: "",
                            city: city,
                            state: uppercase(state),
                            zip: zipCode
                        };
                        return parsedAddress;
                    }
                }
                throw Error(_soloApplication.Application.localize("gateways/invalidZipCode"));
            }, function () {
                throw Error(_soloApplication.Application.localize("gateways/invalidZipCode"));
            });
        }
    }]);

    return ZipcodeValidation;
}();

exports.default = ZipcodeValidation;