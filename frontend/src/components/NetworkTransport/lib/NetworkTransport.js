
export default class NetworkTransport {
    get(path){
        return this._getResource(path)
            .then(this._parseJson);
    }

    send(path, json, verb = "POST"){
        return this._sendResource(path, json, verb)
            .then(this._parseJson);
    }

    // getXml(path){
    //     return this._getResource(path)
    //         .then(this._parseXml);
    // }

    _getResource(path) {
        return new Promise((resolve, reject) => {
            const xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.onload = () => {
                if (xobj.status >= 200 && xobj.status < 300) {
                    resolve(xobj.responseText);
                } else {
                    reject(Error(`_getResource: onload error ${xobj.status} loading resource ${path}.`));
                }
            };
            xobj.onerror = err => {
                reject(Error(`_getResource onerror: error ${err.toString()} loading resource ${path}.`));
            };
            xobj.open("GET", path, true);
            xobj.send(null);
        });
    }

    _sendResource(path, json, verb) {
        return new Promise((resolve, reject) => {
            const body = json ? JSON.stringify(json) : null;
            const xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.onload = () => {
                if (xobj.status >= 200 && xobj.status < 300) {
                    resolve(xobj.responseText);
                } else {
                    reject(Error(`_getResource: onload error ${xobj.status} loading resource ${path}.`));
                }
            };
            xobj.onerror = err => {
                reject(Error(`_getResource onerror: error ${err.toString()} loading resource ${path}.`));
            };
            xobj.open(verb, path, true);
            xobj.send(body);
        });
    }


    // _parseXml(resource) {
    //     let exception;
    //     try {
    //         var oParser = new DOMParser();
    //         var oDOM = oParser.parseFromString(resource, "text/xml");
    //         if (oDOM.documentElement.nodeName !== "parsererror") {
    //             return oDOM.documentElement;
    //         }
    //     } catch (ex) {
    //         exception = ex;
    //     }
    //     throw new Error(`_getResource: onload error parsing XML resource (${exception ? exception.toString() : ""})`);
    // }

    _parseJson(resource) {
        try {
            return resource ? JSON.parse(resource) : null;
        } catch (ex) {
            throw new Error(`_getResource: onload error parsing JSON resource (${ex.toString()}).`);
        }
    }
}
