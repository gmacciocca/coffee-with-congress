import React from "react";

const LinkTo = ({ url, children, refFunc, className }) => {
    const clName = (className || "") + " common-ui__link-to";
    return (
        <a ref={refFunc} className={clName} href={url} target="_blank">{children}</a>
    );
};

export default LinkTo;
