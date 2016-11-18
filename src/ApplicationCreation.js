import { Application, Delegates, UncaughtErrors } from "solo-application";
import { Builder, ComponentFromClass, ComponentFromValue } from "dependency-theory";
import Events from "life-events";
import Localize from "lingo-localize";
import { Storage } from "basement-storage";
import LoadResource from "./LoadResource";
//import AWS from "aws-sdk";

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

        new ComponentFromValue("localize.resource", locResource),
        new ComponentFromClass("localize", Localize)
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

// const testAWS = () => {
//     let db = new AWS.DynamoDB({ endpoint: "http://localhost:8000" });
//     db = null;
// };

const createApp = () => {
    //testAWS();
    const lr = new LoadResource();
    //const resource = "http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID=\"487NONE04270\"><ZipCode ID= \"0\"><Zip5>10044</Zip5></ZipCode></CityStateLookupRequest>";
    //return lr.loadXmlResource(resource)
    //.then(() => lr.loadJsonResource(configuration.localize.resource))
    return lr.loadJsonResource(configuration.localize.resource)
    .then(locResource => {
        const delegates = getDelegates();
        const components = getComponents(locResource);

        Application.create(delegates, components, configuration);
        return Application.bootstrap()
            .then(() => {
                // Application.stores.user.set("002", { name: "Peter", age: 27 });
                // Application.stores.lastGame.set("002", { name: "Fifteen", date: { when: "now", where: "here", who: "me" } });
            });
    })
    .catch(err => {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

const destroyApp = () => {
    // Application.stores.user.clear();
    // Application.stores.lastGame.clear();
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
