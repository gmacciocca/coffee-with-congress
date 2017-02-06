export default class Utils {

    isNullOrUndefined(what) {
        return (what === undefined || what === null);
    }

    newLineToBr(content) {
        return content.replace(/\n/g, "<br>");
    }

    spaceBetween(...args){
        const strings = [...args];
        return strings.filter(str => !!str).join(" ");
    }

    camelCaseToWords(str) {
        return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x){
            return x[0].toUpperCase() + x.substr(1).toLowerCase();
        }).join(" ");
    }

    cloneObject(source) {
        try {
            return JSON.parse(JSON.stringify(source));
        } catch (err) {
            console.error(err); // eslint-disable-line no-console
        }
        return null;
    }
}
