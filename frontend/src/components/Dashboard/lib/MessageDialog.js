import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import { Application } from "solo-application";

export default class MessageDialog extends React.Component {
    constructor(...args) {
        super(...args);
        this._events = Application.roles.events;
        this._offs = [];
    }

    componentDidMount() {
        this._offs.push(this._events.on("cwc:keydown", this.keypressHandler.bind(this)));
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    keypressHandler(event) {
        if (!this.props.open) {
            return;
        }
        if (event.keyCode === 27){
            // event.preventDefault();
            // //event.stopPropagation();
            this.handleCancel();
            return { stopEventPropagation: true };
        }
    }

    handleCancel(){
        this.setState({ open: false });
        this.props.onCancel && this.props.onCancel();
        this.props.onClose && this.props.onClose();
    }

    handleOk(){
        this.setState({ open: false });
        this.props.onOk && this.props.onOk();
        this.props.onClose && this.props.onClose();
    }

    render() {
        const actions = [
            <RaisedButton
                label={Application.localize("dashboard/cancel")}
                primary={false}
                onTouchTap={this.handleCancel.bind(this)}
                className="cwc-button"
            />,
            <RaisedButton
                label={Application.localize("dashboard/ok")}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOk.bind(this)}
                className="cwc-button"
            />,
        ];

        const style = {
            zIndex: 100
        };

        return (
            <div style={style} >
                <Dialog
                    className="dashboard__no-print"
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.text}
                </Dialog>
            </div>
        );
    }
}
