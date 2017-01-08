import React from "react";

const EmailTo = ({ email }) => {
    return (
        <a className="welcome__email-to" href={`mailto:${email}`} target="_top">{email}</a>
    );
};

export default EmailTo;
