"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var NetworkTransport = function () {
    function NetworkTransport() {
        _classCallCheck(this, NetworkTransport);
    }

    _createClass(NetworkTransport, [{
        key: "get",
        value: function get(path) {
            return this._getResource(path).then(this._parseJson);
        }
    }, {
        key: "send",
        value: function send(path, json) {
            var verb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "POST";

            return this._sendResource(path, json, verb).then(this._parseJson);
        }

        // getXml(path){
        //     return this._getResource(path)
        //         .then(this._parseXml);
        // }

    }, {
        key: "_getResource",
        value: function _getResource(path) {
            return new _Promise(function (resolve, reject) {
                var xobj = new XMLHttpRequest();
                xobj.overrideMimeType("application/json");
                xobj.onload = function () {
                    if (xobj.status >= 200 && xobj.status < 300) {
                        resolve(xobj.responseText);
                    } else {
                        reject(Error("_getResource: onload error " + xobj.status + " loading resource " + path + "."));
                    }
                };
                xobj.onerror = function (err) {
                    reject(Error("_getResource onerror: error " + err.toString() + " loading resource " + path + "."));
                };
                xobj.open("GET", path, true);
                xobj.send(null);
            });
        }
    }, {
        key: "_sendResource",
        value: function _sendResource(path, json, verb) {
            return new _Promise(function (resolve, reject) {
                var body = json ? JSON.stringify(json) : null;
                var xobj = new XMLHttpRequest();
                xobj.overrideMimeType("application/json");
                xobj.onload = function () {
                    if (xobj.status >= 200 && xobj.status < 300) {
                        resolve(xobj.responseText);
                    } else {
                        reject(Error("_getResource: onload error " + xobj.status + " loading resource " + path + "."));
                    }
                };
                xobj.onerror = function (err) {
                    reject(Error("_getResource onerror: error " + err.toString() + " loading resource " + path + "."));
                };
                xobj.open(verb, path, true);
                xobj.send(body);
            });
        }

        // _parseXml(resource) {
        //     let exception;
        //     try {
        //         var oParser = new DOMParser();
        //         var oDOM = oParser.parseFromString(resource, "text/xml");
        //         if (oDOM.documentElement.nodeName !== "parsererror") {
        //             return oDOM.documentElement;
        //         }
        //     } catch (ex) {
        //         exception = ex;
        //     }
        //     throw new Error(`_getResource: onload error parsing XML resource (${exception ? exception.toString() : ""})`);
        // }

    }, {
        key: "_parseJson",
        value: function _parseJson(resource) {
            try {
                return resource ? JSON.parse(resource) : null;
            } catch (ex) {
                throw new Error("_getResource: onload error parsing JSON resource (" + ex.toString() + ").");
            }
        }
    }]);

    return NetworkTransport;
}();

exports.default = NetworkTransport;