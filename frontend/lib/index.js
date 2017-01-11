"use strict";

require("./polyfills");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _ApplicationCreation = require("./ApplicationCreation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
(0, _reactTapEventPlugin2.default)();

(0, _ApplicationCreation.createApp)().then(function () {
    _reactDom2.default.render(_routes2.default, document.getElementById("mainElement"));
});