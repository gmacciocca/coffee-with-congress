import { sprintf } from "sprintf-js";
import { Application } from "solo-application";

export default class FormatString {
    formatWithUrlLink(stringKey, urlKey, urlNameKey) {
        const url = Application.localize(urlKey);
        const urlName = this.encodeURIComponent(Application.localize(urlNameKey));
        const aTag = `<a href="${url}" target="_blank">${urlName}</a>`;
        return sprintf(Application.localize(stringKey), aTag);
    }

    encodeURIComponent(str) {
        str = encodeURIComponent(str);
        str = str.replace(/'/g, "%27");
        return str;
    }

    formatWithEmailLink(stringKey, emailKey, subject, body) {
        const email = Application.localize(emailKey);
        subject = this.encodeURIComponent(subject);
        body = this.encodeURIComponent(body);
        const href = `mailto:${email}?Subject=${subject}&body=${body}`;
        const onClickCode = `var e=arguments[0];e.preventDefault();e.stopPropagation();var a=document.createElement('a');a.href ='${href}';a.click();`;
        const aTag = `<a href="#" onClick="${onClickCode}" target='_top'>${email}</a>`;
        return sprintf(Application.localize(stringKey), aTag);
    }
}
