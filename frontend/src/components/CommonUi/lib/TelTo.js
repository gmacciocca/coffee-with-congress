import React from "react";

const TelTo = ({ phone, children, onClick }) => {
    return (
        <a onClick={onClick} className="common-ui__tel-to" href={`tel:${phone}`}>{children}</a>
    );
};

export default TelTo;
