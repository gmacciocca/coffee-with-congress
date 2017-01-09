import React from "react";

const LinkTo = ({ url, children }) => {
    return (
        <a className="welcome__link-to" href={url} target="_blank">{children}</a>
    );
};

export default LinkTo;
