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
}
