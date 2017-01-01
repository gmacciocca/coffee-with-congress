
export default class LoadResource {
    jsonResource(resourcePath){
        return this._loadResource(resourcePath)
            .then(this._parseJson);
    }

    xmlResource(resourcePath){
        return this._loadResource(resourcePath)
            .then(this._parseXml);
    }

    _loadResource(resourcePath) {
        return new Promise((resolve, reject) => {
            const xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.onload = () => {
                if (xobj.status >= 200 && xobj.status < 300) {
                    resolve(xobj.responseText);
                } else {
                    reject(Error(`loadJsonResource: onload error ${xobj.status} loading resource ${resourcePath}.`));
                }
            };
            xobj.onerror = err => {
                reject(Error(`loadJsonResource onerror: error ${err.toString()} loading resource ${resourcePath}.`));
            };
            xobj.open("GET", resourcePath, true);
            xobj.send(null);
        });
    }

    _parseXml(resource) {
        let exception;
        try {
            var oParser = new DOMParser();
            var oDOM = oParser.parseFromString(resource, "text/xml");
            if (oDOM.documentElement.nodeName !== "parsererror") {
                return oDOM.documentElement;
            }
        } catch (ex) {
            exception = ex;
        }
        throw new Error(`loadJsonResource: onload error parsing XML resource (${exception ? exception.toString() : ""})`);
    }

    _parseJson(resource) {
        try {
            return JSON.parse(resource);
        } catch (ex) {
            throw new Error(`loadJsonResource: onload error parsing JSON resource (${ex.toString()}).`);
        }
    }
}
