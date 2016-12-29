import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Application } from "solo-application";

export default class TemplateEditDialog extends React.Component {

    componentDidMount() {
        global.document.addEventListener("keydown", this.keypressHandler.bind(this));
    }

    componentWillUnmount() {
        global.document.removeEventListener("keydown", this.keypressHandler.bind(this));
    }

    keypressHandler(event) {
        if (!this.props.shouldShow) {
            return;
        }
        if (event.keyCode === 27){
            event.preventDefault();
            event.stopPropagation();
            this.handleCancel();
        }
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleSave() {
        this.props.onSave(this._form.elements.template.value);
    }

    onSubmit() {
        this.handleSave();
    }

    render() {
        const actions = [
            <FlatButton
                label={Application.localize("dashboard/cancel")}
                primary={true}
                onTouchTap={this.handleSave.bind(this)}
                type="button"
            />,
            <FlatButton
                label={Application.localize("dashboard/save")}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave.bind(this)}
                type="submit"
            />,
        ];

        return (
            <Dialog
                title={Application.localize("dashboard/templateEditDialogTitle")}
                actions={actions}
                modal={true}
                open={this.props.shouldShow}
                onRequestClose={this.handleCancel.bind(this)}
                contentStyle={{ width: "100%", height: "100%" }}
            >
                <form ref={ref => this._form = ref} onSubmit={this.onSubmit.bind(this)}>
                    <p>
                        <TextField
                            name="template"
                            style={{ width: "100%" }}
                            hintText={Application.localize("dashboard/template")}
                            defaultValue={this.props.template}
                            multiLine={true}
                            rows={30}
                            rowsMax={30}
                        />
                    </p>
                </form>
            </Dialog>
        );
    }
}
