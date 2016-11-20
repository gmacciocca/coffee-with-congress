import React from "react";
import classNames from "classnames";

const TextInput = ({ clName, name, placeholder }) => {
    placeholder = placeholder || "";
    name = name || "";
    return (
        <div>
            <label className="small strong cwc-charcoal-grey-text user__form__label">
                <input className={classNames("cwc-input", { [clName]: clName })}
                    name={name}
                    placeholder={placeholder}
                />
            </label>
        </div>
    );
};

export default TextInput;

// <input classNames={classNames("cwc-input", { className: className })}
