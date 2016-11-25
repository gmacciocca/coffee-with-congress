import React from "react";
import FlatButton from "material-ui/FlatButton";
import { Application } from "solo-application";

const ContinueButton = ({ disabled }) => {
    return (
        <div>
            <FlatButton
                type="submit"
                disabled={disabled}
                label={Application.localize("welcome/continue")}
                primary={true}
            />
        </div>
    );
};

export default ContinueButton;
