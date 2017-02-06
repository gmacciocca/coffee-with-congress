import { vsprintf } from "sprintf-js";
import { Application } from "solo-application";
import { LinkTo } from "../../CommonUi";
import React from "react";

export default class FormatString {
    formatWithUrlLink(stringKey, urlKey, urlNameKey) {
        const Comp = () => (
            <LinkTo url={Application.localize(urlKey)} >
                {Application.localize(urlNameKey)}
            </LinkTo>
        );
        return this.formatWithComponent(Application.localize(stringKey), Comp);
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
        const Comp = () => {
            const href = `mailto:${email}?Subject=${subject}&body=${body}`;
            return (
                <a href={href} onClick={(e) => e.stopPropagation()} >{email}</a>
            );
        };
        return this.formatWithComponent(Application.localize(stringKey), Comp);
    }

    formatWithComponent(str, components, replaceKey = "&cpn;") {
        components = !Array.isArray(components) ? [ components ] : components;
        let parts = str.split(replaceKey);
        if (parts.length < 2) {
            return (<span>{str}</span>);
        }
        // If we don't have enough components, then reuse the last component specified
        while (components.length < (parts.length - 1)) {
            components.push(components[components.length - 1]);
        }
        // Build up parts array alternating string parts and components.
        components.forEach((component, index) => {
            parts.splice((index * 2) + 1, 0, component);
        });
        // Remove falsey string parts
        parts = parts.filter(part => part);
        //  Recursively replace "</br>" with </br>
        const StringPart = ({ str }) => {
            const BR = () => (<br />);
            return this.formatWithComponent(str, BR, "<br/>");
        };
        return (
            <span>
                {parts.map((Part, index) => {
                    if (typeof Part === "string") {
                        return <StringPart key={index} str={Part} />;
                    } else if (typeof Part === "function") {
                        return (<Part key={index} />);
                    } else if (typeof Part === "object") {
                        return Part;
                    }
                })}
            </span>
        );
    }

    format(stringKey, ...args) {
        const message = Application.localize(stringKey);
        return vsprintf(message, args);
    }
}
