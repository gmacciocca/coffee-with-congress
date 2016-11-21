import React from "react";
import classNames from "classnames";

const noop = () => {};

const Button = ({ clName, name, onClick, disabled }) => {
    onClick = onClick || noop;
    name = name || "";
    return (
        <div>
            <button className={classNames("cwc-button", { [clName]: clName })} onClick={onClick} disabled={disabled} >{name}</button>
        </div>
    );
};

export default Button;
