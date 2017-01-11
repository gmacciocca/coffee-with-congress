"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gravatar = function () {
    function Gravatar(_ref) {
        var networkTransport = _ref.networkTransport;

        _classCallCheck(this, Gravatar);

        this._networkTransport = networkTransport;
    }

    _createClass(Gravatar, [{
        key: "getImageUrl",
        value: function getImageUrl(emailHash) {
            return "http://gravatar.com/avatar/" + emailHash;
        }
    }, {
        key: "fetchUserInfo",
        value: function fetchUserInfo(emailHash) {
            var path = "https://en.gravatar.com/" + emailHash + ".json";
            return this._networkTransport.get(path).then(function (userJson) {
                var photoUrl = userJson && userJson.entry && Array.isArray(userJson.entry.photos) && userJson.entry.photos[0] && userJson.entry.photos[0].type === "thumbnail" && userJson.entry.photos[0].value;

                var bio = userJson && userJson.entry && userJson.entry.aboutMe;

                var name = userJson && userJson.entry && userJson.entry.name && userJson.entry.name.formatted;

                return { name: name, bio: bio, photoUrl: photoUrl };
            }, function () {
                return {};
            });
        }
    }]);

    return Gravatar;
}();

exports.default = Gravatar;