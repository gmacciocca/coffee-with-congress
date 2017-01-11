"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _soloApplication = require("solo-application");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaEvents = function () {
    function MediaEvents(_ref) {
        var events = _ref.events;

        _classCallCheck(this, MediaEvents);

        this._events = events;
        global.addEventListener("resize", this._onResize.bind(this));
    }

    _createClass(MediaEvents, [{
        key: "_onResize",
        value: function _onResize() {
            var width = this.currentWidth;
            var height = this.currentHeight;
            this._events.fireWait("screenResize", { width: width, height: height });
        }
    }, {
        key: "onMediumScreen",
        value: function onMediumScreen(func) {
            return this.onMediumScreenLessThan(func, _soloApplication.Application.configuration.media["medium-screen"]);
        }
    }, {
        key: "onScreenResize",
        value: function onScreenResize(func) {
            var off = this._events.on("screenResize", function (_ref2) {
                var width = _ref2.width,
                    height = _ref2.height;

                func({ width: width, height: height });
            });
            func({
                width: this.currentWidth,
                height: this.currentHeight
            });
            return off;
        }
    }, {
        key: "onMediumScreenLessThan",
        value: function onMediumScreenLessThan(func, lessThanWidth) {
            var lastWidth = lessThanWidth + 1;
            var off = this._events.on("screenResize", function (_ref3) {
                var width = _ref3.width,
                    height = _ref3.height;

                if (lastWidth > lessThanWidth !== width > lessThanWidth) {
                    func({ width: width, height: height, isLess: lastWidth > lessThanWidth });
                    lastWidth = width;
                }
            });
            func({
                width: this.currentWidth,
                height: this.currentHeight,
                isLess: this.currentWidth < lessThanWidth
            });
            return off;
        }
    }, {
        key: "currentWidth",
        get: function get() {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }
    }, {
        key: "currentHeight",
        get: function get() {
            return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }
    }]);

    return MediaEvents;
}();

exports.default = MediaEvents;