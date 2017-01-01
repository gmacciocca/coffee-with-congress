import React from "react";
import Moment from "moment";
import { Application } from "solo-application";
import letterConstants from "./letterConstants";
import { sprintf } from "sprintf-js";

export default class Letter extends React.Component {
    constructor(...args) {
        super(...args);
        this._formatString = Application.roles.formatString;
        this._utils = Application.roles.utils;
    }

    userNameForLetter(address) {
        return address.name ?
            <div>{address.name}</div> :
            <div className="letter__contents__replace-string">{Application.localize("dashboard/pleaseEnterYourNameHere")}</div>;
    }

    get addressFrom() {
        const { addressFrom } = this.props;
        return addressFrom ? (
            <div className="letter__contents__editable" onClick={this.props.onEditUser}>
                {this.userNameForLetter(addressFrom)}
                {addressFrom.address}<br />
                {`${this._utils.spaceBetween(addressFrom.city, addressFrom.state, addressFrom.zip)}`}<br />
            </div>
        ) :
        null;
    }

    get date() {
        var date = new Date();
        const momentDate = new Moment(date);
        return (
            <time tabIndex="0" dateTime={momentDate.toISOString().substr(0, 10)}>
                {momentDate.format("LL")}<br />
            </time>
        );
    }

    get addressTo() {
        const { addressTo } = this.props;
        return addressTo ? (
            <div>{addressTo.name}<br />
                {`${this._utils.spaceBetween(addressTo.address1, addressTo.address2)}`}<br />
                {`${this._utils.spaceBetween(addressTo.city, addressTo.state, addressTo.zip_code)}`}<br />
                {`${addressTo.phones}`}<br />
                {`${addressTo.emails}`}<br />
            </div>
        ) :
        <div className="letter__contents__replace-string">{Application.localize("dashboard/pleaseSelectARepresentative")}</div>;
    }

    get noTemplateMessage() {
        if (this.props.fetchingData) {
            return "";
        }
        const subject = sprintf(
            Application.localize("dashboard/noTemplageEmailSubject"),
            this.props.issueId,
            this.props.state,
            this.props.level
        );
        const body = Application.localize("dashboard/noTemplageEmailBody");
        return this._formatString.formatWithEmailLink(
            "dashboard/noTemplageMessage",
            "dashboard/noTemplageEmailAddress",
            subject,
            body
        );
    }

    get template() {
        const { templateContent } = this.props;
        return templateContent ? (
            <div
                className="letter__contents__editable"
                dangerouslySetInnerHTML={{ __html: this._utils.newLineToBr(templateContent) }}
                onClick={this.props.onEditTemplate}
            />
        ) : (
            <div
                onClick={this.props.onEditTemplate}
                dangerouslySetInnerHTML={{ __html: this._utils.newLineToBr(this.noTemplateMessage) }}
                className="letter__contents__editable letter__contents__replace-string"
            />
        );
    }

    get styles() {
        const width = this.props.forPrint ? letterConstants.letterWidthIn : letterConstants.letterWidthPx;
        const height = this.props.forPrint ? letterConstants.letterHeightIn : letterConstants.letterHeightPx;

        const fontSize = height / letterConstants.letterLinesPerPage;
        const lineHeight = height / letterConstants.letterLinesPerPage;
        const letterMargin = letterConstants.letterMarginInLines * lineHeight;

        //const scale = 0.3; //0.5; // (wrapperSize.width / contentSize.width);
        const scale = !this.props.forPrint ? {
            transform: "scale(" + this.props.width / width + ")",
            transformOrigin: "0 0 0"
        } : {};

        const unit = this.props.forPrint ? "in" : "px";

        return {
            letterStyle: {
                width: `${width}${unit}`,
                height: `${height}${unit}`,
                fontSize: `${fontSize}${unit}`,
                lineHeight: `${lineHeight}${unit}`,
                fontWeight: "lighter",
                ...scale
            },
            letterContentStyle: {
                width: `${width - letterMargin}${unit}`,
                height: `${height - letterMargin}${unit}`
            }
        };
    }

    render() {
        const styles = this.styles;
        return (
            <div className="letter" style={styles.letterStyle}>
                <div className="letter__contents" style={styles.letterContentStyle}>
                    {this.addressFrom}
                    <br />
                    <br />
                    {this.date}
                    <br />
                    <br />
                    {this.addressTo}
                    <br />
                    <br />
                    {this.template}
                </div>
            </div>
        );
    }
}
