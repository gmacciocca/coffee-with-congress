import React from "react";

export default class Letter extends React.Component {

    get addressTo() {
        return (
            <div className="letter__address-to" >
                {this.props.addressTo}
            </div>
        );
    }

    get addressFrom() {
        return (
            <div
                className="letter__address-from"
                contentEditable={false}
                onClick={this.props.onEditUser}
            >
                {this.props.addressFrom}
            </div>
        );
    }

    get date() {
        return (
            <div className="letter__date" >
                {this.props.date}
            </div>
        );
    }

    get body() {
        return (
            <div
                className="letter__body"
                contentEditable={false}
                onClick={this.props.onEditBody}
            >
                {this.props.body}
            </div>
        );
    }
    
    //  border_color  OR  mode_edit
    render() {
        return (
            <div className="letter" style={this.props.inlineStyle}>
                <i className="dashboard__no-print material-icons letter__address-from__edit-icon"
                    onClick={this.props.onEditUser}
                    style={this.props.editIconStyle}>
                    border_color
                </i>
                <i className="dashboard__no-print material-icons letter__body__edit-icon"
                    onClick={this.props.onEditBody}
                    style={this.props.editIconStyle}>
                    border_color
                </i>
                {this.addressFrom}
                {this.date}
                {this.addressTo}
                {this.body}
            </div>
        );
    }
}
