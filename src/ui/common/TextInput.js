import React from "react";

const TextInput = ({ name, placeholder }) => {
    placeholder = placeholder || "";
    name = name || "";
    return (
        <div>
            <label className="small strong cwc-charcoal-grey-text user__form__label">
                <input className="cwc-input" name={name} placeholder={placeholder} />
            </label>
        </div>
    );
};

export default TextInput;
