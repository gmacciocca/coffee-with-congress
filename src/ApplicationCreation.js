import { Application, Delegates, UncaughtErrors } from "solo-application";
import { Builder, ComponentFromClass, ComponentFromValue } from "dependency-theory";
import Events from "life-events";
import Localize from "lingo-localize";
import { Storage } from "basement-storage";
import LoadResource from "./local-components/LoadResource";
import AddressValidation from "./local-components/AddressValidation";
import AddressValidationUsps from "./local-components/AddressValidationUsps";

const configuration = {
    localize: {
        resource: "./resources/en-us.json"
    },
    storage: {
        schemas: {
            "storage.localStorage" : {
                "user": ["name", "age"],
            },
            "storage.sessionStorage": {
                "lastGame": ["name", "data" ]
            }
        }
    }
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
        new ComponentFromClass("addressValidation", AddressValidation),
        new ComponentFromClass("addressValidationUsps", AddressValidationUsps)
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

const createApp = () => {
    const lr = new LoadResource();
    return lr.jsonResource(configuration.localize.resource)
    .then(locResource => {
        const delegates = getDelegates();
        const components = getComponents(locResource);

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
