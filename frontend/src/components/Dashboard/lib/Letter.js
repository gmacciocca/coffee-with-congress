import React from "react";

export default class Letter extends React.Component {

    get addressTo() {
        return (
            <div className="letter__address-to">
                {this.props.addressTo}
            </div>
        );
    }

    get addressFrom() {
        return (
            <div className="letter__address-from">
                {this.props.addressFrom}
            </div>
        );
    }

    get date() {
        return (
            <div className="letter__date">
                {this.props.date}
            </div>
        );
    }

    get body() {
        return (
            <div className="letter__body">
                {this.props.body}
            </div>
        );
    }

    get letterInlineStyle() {
        return (this.props.width && this.props.height) ?
            {
                width: this.props.width,
                height: this.props.height
            } :
            {};
    }

    render() {
        return (
            <div className="letter" style={this.letterInlineStyle}>
                {this.addressTo}
                {this.addressFrom}
                {this.date}
                {this.body}
            </div>
        );
    }
}
