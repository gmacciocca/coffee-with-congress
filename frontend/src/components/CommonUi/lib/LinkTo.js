import React from "react";

const LinkTo = ({ url, children, refFunc, className, style }) => {
    const clName = (className || "") + " common-ui__link-to";
    const props = {
        className: clName,
        href: url || "",
        target: "_blank"
    };
    if (style) {
        props.style = style;
    }
    return (
        <a {...props} ref={refFunc} >{children}</a>
    );
};

export default LinkTo;
