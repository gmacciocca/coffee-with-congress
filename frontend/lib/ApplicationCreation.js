"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.destroyApp = exports.createApp = undefined;

var _soloApplication = require("solo-application");

var _dependencyTheory = require("dependency-theory");

var _lifeEvents = require("life-events");

var _lifeEvents2 = _interopRequireDefault(_lifeEvents);

var _lingoLocalize = require("lingo-localize");

var _lingoLocalize2 = _interopRequireDefault(_lingoLocalize);

var _basementStorage = require("basement-storage");

var _Gateways = require("./components/Gateways");

var _Utils = require("./components/Utils");

var _NetworkTransport = require("./components/NetworkTransport");

var _CommonUi = require("./components/CommonUi");

var _Dashboard = require("./components/Dashboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appPackage = require("../package.json");


var LOCALIZE_RESOURCE = "./resources/en-us.json";
var JSON_THEME_COLORS = "./resources/themeColors.json";
var JSON_MEDIA = "./resources/media.json";

var configuration = {
    origins: {
        cwcServer: "https://causal-port-151005.appspot.com"
    },
    storage: {
        schemas: {
            "storage.sessionStorage": {
                "user": [],
                "contacts": []
            }
        }
    },
    themeColors: {},
    clientName: appPackage.name,
    clientVersion: appPackage.version,
    clientDescription: appPackage.description,

    //officialLevels: ["city", "state", "federal"]
    officialLevels: ["state", "federal"]
};

var getComponents = function getComponents(locResource) {
    return [new _dependencyTheory.ComponentFromClass("utils", _Utils.Utils), new _dependencyTheory.ComponentFromClass("analytics", _Utils.Analytics), new _dependencyTheory.ComponentFromValue("storage.sessionStorage", global.sessionStorage), new _dependencyTheory.ComponentFromValue("storage.localStorage", global.localStorage), new _dependencyTheory.ComponentFromValue("storage.schemas", configuration.storage.schemas), new _dependencyTheory.ComponentFromClass("storage", _basementStorage.Storage), new _dependencyTheory.ComponentFromClass("networkTransport", _NetworkTransport.NetworkTransport), new _dependencyTheory.ComponentFromValue("localize.resource", locResource), new _dependencyTheory.ComponentFromClass("localize", _lingoLocalize2.default), new _dependencyTheory.ComponentFromClass("addressParser", _Utils.AddressParser), new _dependencyTheory.ComponentFromClass("formatString", _Utils.FormatString), new _dependencyTheory.ComponentFromClass("cwcServer", _Gateways.CwcServer),
    //new ComponentFromClass("cwcServer", CwcServerMocked),
    new _dependencyTheory.ComponentFromClass("zipcodeValidation", _Gateways.ZipcodeValidation), new _dependencyTheory.ComponentFromClass("mediaEvents", _CommonUi.MediaEvents), new _dependencyTheory.ComponentFromValue("uiAppHeader", _Dashboard.AppHeader), new _dependencyTheory.ComponentFromClass("gravatar", _Utils.Gravatar)];
};

var getDelegates = function getDelegates() {
    return new _soloApplication.Delegates({
        createEvents: function createEvents() {
            return new _lifeEvents2.default();
        },
        createUncaughtErrors: function createUncaughtErrors() {
            return new _soloApplication.UncaughtErrors();
        },
        createDependenciesBuilder: function createDependenciesBuilder() {
            return new _dependencyTheory.Builder();
        }
    });
};

var getAllResources = function getAllResources() {
    var nt = new _NetworkTransport.NetworkTransport();
    var localize = void 0,
        themeColors = void 0,
        media = void 0;
    return nt.get(LOCALIZE_RESOURCE).then(function (res) {
        localize = res;
        return nt.get(JSON_THEME_COLORS);
    }).then(function (res) {
        themeColors = res.themeColors;
        return nt.get(JSON_MEDIA);
    }).then(function (res) {
        media = res.media;
        return { localize: localize, themeColors: themeColors, media: media };
    });
};

var createApp = function createApp() {
    return getAllResources().then(function (resources) {
        configuration.themeColors = resources.themeColors;
        configuration.media = resources.media;
        var delegates = getDelegates();
        var components = getComponents(resources.localize);

        _soloApplication.Application.create(delegates, components, configuration);
        return _soloApplication.Application.bootstrap().then(function () {
            _soloApplication.Application.roles.analytics.sendAppLoadedEvent();
        });
    }).catch(function (err) {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

var destroyApp = function destroyApp() {
    return _soloApplication.Application.shutdown().then(function () {
        _soloApplication.Application.destroy();
    }).catch(function (err) {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

exports.createApp = createApp;
exports.destroyApp = destroyApp;