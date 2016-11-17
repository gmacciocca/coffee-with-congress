const loadJsonResource = (resourcePath) => {
    return new Promise((resolve, reject) => {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.onload = () => {
            if (xobj.status >= 200 && xobj.status < 300) {
                try {
                    resolve(JSON.parse(xobj.responseText));
                } catch (ex) {
                    reject(Error(`loadJsonResource: onload error parsing JSON resource ${resourcePath}.`));
                }
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
};

export default loadJsonResource;
