import React from "react";
import Moment from "moment";
import { Application } from "solo-application";
import letterConstants from "./letterConstants";
import { sprintf } from "sprintf-js";

const lineOrNothing = (line) => {
    return line ? (<span>{line}<br /></span>) : null;
};

const isAddressComplete = (address) => {
    return !!(address &&
        address.name &&
        address.address1 &&
        address.city &&
        address.state &&
        address.zip_code);
};

const makeSureIsArray = (obj) => {
    return Array.isArray(obj) ? obj : [];
};

export default class Letter extends React.Component {
    constructor(...args) {
        super(...args);
        this._formatString = Application.roles.formatString;
        this._utils = Application.roles.utils;
    }

    get addressFrom() {
        const { addressFrom } = this.props;
        const addressIsComplete = isAddressComplete(addressFrom);

        const line0 = addressIsComplete ?
            null :
            (<div className="letter__contents__message-string">
                {Application.localize("dashboard/clickHereToCompleteUserAddress")}
            </div>);

        const line1 = addressFrom.name;
        const line2 = `${this._utils.spaceBetween(addressFrom.address1, addressFrom.address2)}`;
        const line3 = `${this._utils.spaceBetween(addressFrom.city, addressFrom.state, addressFrom.zip_code)}`;

        return addressFrom ? (
            <div className="letter__contents__editable" onClick={this.props.onEditUserAddress}>
                {line0}
                {lineOrNothing(line1)}
                {lineOrNothing(line2)}
                {lineOrNothing(line3)}
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
        const addressIsComplete = isAddressComplete(addressTo);
        const props = {};
        if (!addressIsComplete || addressTo.isCustomContactAddress) {
            props.onClick = this.props.onEditContactAddress;
            props.className = "letter__contents__editable";
        }

        const line0 = addressIsComplete ?
            null :
            (<div className="letter__contents__message-string">
                {Application.localize("dashboard/clickHereToCompleteOfficialAddress")}
            </div>);

        const line1 = addressTo.name;
        const line2 = `${this._utils.spaceBetween(addressTo.address1, addressTo.address2)}`;
        const line3 = `${this._utils.spaceBetween(addressTo.city, addressTo.state, addressTo.zip_code)}`;
        const line4 = this._utils.spaceBetween(...makeSureIsArray(addressTo.phones));
        const line5 = this._utils.spaceBetween(...makeSureIsArray(addressTo.emails));

        return addressTo ? (
            <div {...props} >
                {line0}
                {lineOrNothing(line1)}
                {lineOrNothing(line2)}
                {lineOrNothing(line3)}
                {lineOrNothing(line4)}
                {lineOrNothing(line5)}
            </div>
        ) :
        <div className="letter__contents__message-string">{Application.localize("dashboard/pleaseSelectARepresentative")}</div>;
    }

    get noTemplateMessage() {
        if (this.props.fetchingData) {
            return "";
        }
        const subject = sprintf(
            Application.localize("dashboard/noTemplageEmailSubject"),
            this.props.issueName,
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
                className="letter__contents__editable letter__contents__message-string"
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
