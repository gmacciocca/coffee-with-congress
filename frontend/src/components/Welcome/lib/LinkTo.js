import React from "react";

const LinkTo = ({ url, urlName }) => {
    return (
        <a className="welcome__link-to" href={url} target="_blank">{urlName}</a>
    );
};

export default LinkTo;
