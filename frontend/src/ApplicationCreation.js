var appPackage = require("../package.json");
import { Application, Delegates, UncaughtErrors } from "solo-application";
import { Builder, ComponentFromClass, ComponentFromValue } from "dependency-theory";
import Events from "life-events";
import Localize from "lingo-localize";
import { Storage } from "basement-storage";
import { ZipcodeValidation, CwcServer, CwcServerMocked } from "./components/Gateways";
import { AddressParser, FormatString, Analytics, Utils } from "./components/Utils";
import { LoadResource } from "./components/LoadResource";
import { MediaEvents } from "./components/CommonUi";

const LOCALIZE_RESOURCE = "./resources/en-us.json";
const JSON_THEME_COLORS = "./resources/themeColors.json";
const JSON_MEDIA = "./resources/media.json";

const configuration = {
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
    officialLevels: ["federal"]
};

const getComponents = (locResource) => {
    return [
        new ComponentFromClass("analytics", Analytics),
        new ComponentFromClass("utils", Utils),
        new ComponentFromValue("storage.sessionStorage", global.sessionStorage),
        new ComponentFromValue("storage.localStorage", global.localStorage),
        new ComponentFromValue("storage.schemas", configuration.storage.schemas),
        new ComponentFromClass("storage", Storage),
        new ComponentFromClass("loadResource", LoadResource),
        new ComponentFromValue("localize.resource", locResource),
        new ComponentFromClass("localize", Localize),
        new ComponentFromClass("addressParser", AddressParser),
        new ComponentFromClass("formatString", FormatString),
        new ComponentFromClass("cwcServer", CwcServer),
        //new ComponentFromClass("cwcServer", CwcServerMocked),
        new ComponentFromClass("zipcodeValidation", ZipcodeValidation),
        new ComponentFromClass("mediaEvents", MediaEvents)
    ];
};

const getDelegates = () => {
    return new Delegates({
        createEvents() {
            return new Events();
        },
        createUncaughtErrors() {
            return new UncaughtErrors();
        },
        createDependenciesBuilder() {
            return new Builder();
        }
    });
};

const getAllResources = () => {
    const lr = new LoadResource();
    let localize, themeColors, media;
    return lr.jsonResource(LOCALIZE_RESOURCE)
    .then(res => {
        localize = res;
        return lr.jsonResource(JSON_THEME_COLORS);
    })
    .then(res => {
        themeColors = res.themeColors;
        return lr.jsonResource(JSON_MEDIA);
    })
    .then(res => {
        media = res.media;
        return { localize, themeColors, media };
    });
};

const createApp = () => {
    return getAllResources()
    .then(resources => {
        configuration.themeColors = resources.themeColors;
        configuration.media = resources.media;
        const delegates = getDelegates();
        const components = getComponents(resources.localize);

        Application.create(delegates, components, configuration);
        return Application.bootstrap()
            .then(()=> {
                Application.roles.analytics.sendAppLoadedEvent();
            });
    })
    .catch(err => {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

const destroyApp = () => {
    return Application.shutdown()
    .then(() => {
        Application.destroy();
    })
    .catch(err => {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

export { createApp, destroyApp };
