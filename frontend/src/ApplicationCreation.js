import { Application, Delegates, UncaughtErrors } from "solo-application";
import { Builder, ComponentFromClass, ComponentFromValue } from "dependency-theory";
import Events from "life-events";
import Localize from "lingo-localize";
import { Storage } from "basement-storage";
import { ZipcodeValidation, CwcServerMocked } from "./components/Gateways";
import { AddressParser } from "./components/Utils";
import { LoadResource } from "./components/LoadResource";
import { MediaEvents } from "./components/CommonUi";

const LOCALIZE_RESOURCE = "./resources/en-us.json";
const JSON_COLORS = "./resources/colors.json ";
const JSON_MEDIA = "./resources/media.json ";

const configuration = {
    origins: {
        cwcServer: "http://localhost/"
    },
    storage: {
        schemas: {
            "storage.sessionStorage": {
                "user": [],
                "contacts": [],
                "templates": []
            }
        }
    },
    colors: {}
};

const getComponents = (locResource) => {
    return [
        new ComponentFromValue("storage.sessionStorage", global.sessionStorage),
        new ComponentFromValue("storage.localStorage", global.localStorage),
        new ComponentFromValue("storage.schemas", configuration.storage.schemas),
        new ComponentFromClass("storage", Storage),
        new ComponentFromClass("loadResource", LoadResource),
        new ComponentFromValue("localize.resource", locResource),
        new ComponentFromClass("localize", Localize),
        new ComponentFromClass("addressParser", AddressParser),
        new ComponentFromClass("cwcServer", CwcServerMocked),
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
    let localize, colors, media;
    return lr.jsonResource(LOCALIZE_RESOURCE)
    .then(res => {
        localize = res;
        return lr.jsonResource(JSON_COLORS);
    })
    .then(res => {
        colors = res.colors;
        return lr.jsonResource(JSON_MEDIA);
    })
    .then(res => {
        media = res.media;
        return { localize, colors, media };
    });
};

const createApp = () => {
    return getAllResources()
    .then(resources => {
        configuration.colors = resources.colors;
        configuration.media = resources.media;
        const delegates = getDelegates();
        const components = getComponents(resources.localize);

        Application.create(delegates, components, configuration);
        return Application.bootstrap();
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
