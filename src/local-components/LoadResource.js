
export default class LoadResource {
    jsonResource(resourcePath){
        return this.loadResource(resourcePath)
            .then(responseText => {
                try {
                    return JSON.parse(responseText);
                } catch (ex) {
                    throw new Error(`loadJsonResource: onload error parsing JSON resource ${resourcePath}.`);
                }
            });
    }

    xmlResource(resourcePath){
        return this.loadResource(resourcePath)
            .then(responseText => {
                let exception;
                try {
                    var oParser = new DOMParser();
                    var oDOM = oParser.parseFromString(responseText, "text/xml");
                    if (oDOM.documentElement.nodeName !== "parsererror") {
                        return oDOM.documentElement;
                    }
                } catch (ex) {
                    exception = ex;
                }
                throw new Error(`loadJsonResource: onload error parsing JSON resource ${resourcePath} (${exception ? exception.toString() : ""})`);
            });
    }

    loadResource(resourcePath) {
        return new Promise((resolve, reject) => {
            const xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.onload = () => {
                if (xobj.status >= 200 && xobj.status < 300) {
                    resolve(xobj.responseText);
                } else {
                    reject(Error(`loadJsonResource: onload error ${xobj.status} trying to load resource ${resourcePath}.`));
                }
            };
            xobj.onerror = err => {
                reject(Error(`loadJsonResource onerror: error ${err.toString()} trying to load resource ${resourcePath}.`));
            };
            xobj.open("GET", resourcePath, true);
            xobj.send(null);
        });
    }
}
