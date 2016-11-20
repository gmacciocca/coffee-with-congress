import React from "react";
import classNames from "classnames";

const noop = () => {};

const Button = ({ clName, name, onClick }) => {
    onClick = onClick || noop;
    name = name || "";
    return (
        <div>
            <button className={classNames("cwc-button", { [clName]: clName })} onClick={onClick} >{name}</button>
        </div>
    );
};

export default Button;
