"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _IssuesSelect = require("./IssuesSelect");

var _IssuesSelect2 = _interopRequireDefault(_IssuesSelect);

var _ContactsSelect = require("./ContactsSelect");

var _ContactsSelect2 = _interopRequireDefault(_ContactsSelect);

var _Paper = require("material-ui/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Letter = require("./Letter");

var _Letter2 = _interopRequireDefault(_Letter);

var _CommonUi = require("../../CommonUi");

var _NumberInCircle = require("./NumberInCircle");

var _NumberInCircle2 = _interopRequireDefault(_NumberInCircle);

var _AddressEditDialog = require("./AddressEditDialog");

var _AddressEditDialog2 = _interopRequireDefault(_AddressEditDialog);

var _TemplateEditDialog = require("./TemplateEditDialog");

var _TemplateEditDialog2 = _interopRequireDefault(_TemplateEditDialog);

var _PrintWarningDialog = require("./PrintWarningDialog");

var _PrintWarningDialog2 = _interopRequireDefault(_PrintWarningDialog);

var _letterConstants = require("./letterConstants");

var _letterConstants2 = _interopRequireDefault(_letterConstants);

var _AppHeader = require("./AppHeader");

var _AppHeader2 = _interopRequireDefault(_AppHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var Dashboard = function (_React$Component) {
    _inherits(Dashboard, _React$Component);

    function Dashboard() {
        var _ref;

        _classCallCheck(this, Dashboard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call.apply(_ref, [this].concat(args)));

        _this._events = _soloApplication.Application.roles.events;
        _this._userStore = _soloApplication.Application.stores.user;
        _this._contactsStore = _soloApplication.Application.stores.contacts;
        _this._cwcServer = _soloApplication.Application.roles.cwcServer;
        _this._utils = _soloApplication.Application.roles.utils;
        _this._mediaEvents = _soloApplication.Application.roles.mediaEvents;
        _this._analytics = _soloApplication.Application.roles.analytics;

        _this.state = {
            address: null,
            issues: null,
            issueIdSelected: null,
            contacts: null,
            contactIdSelected: null,
            templates: null,
            templateIdSelected: null,
            paperStyle: {},
            showProgress: false,
            showAddressEditDialog: false,
            showTemplateEditDialog: false,
            showPrintWarningDialog: false
        };
        _this._offs = [];
        return _this;
    }

    _createClass(Dashboard, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.loadData();
            this.setLiteners();
        }
    }, {
        key: "selectDefaultContact",
        value: function selectDefaultContact(selections, contacts) {
            if (this._utils.isNullOrUndefined(selections.contactIdSelected)) {
                // Select initial default contact
                var defaultContact = contacts.federal && contacts.federal[0] || contacts.state && contacts.state[0] || contacts.city && contacts.city[0];
                selections.contactIdSelected = defaultContact && defaultContact.id;
            }
        }
    }, {
        key: "loadData",
        value: function loadData() {
            var address = this._userStore.get("address");
            var selections = this._userStore.get("selections") || {
                issueIdSelected: this.state.issueIdSelected,
                contactIdSelected: this.state.contactIdSelected
            };
            var contacts = this._contactsStore.get("contacts");
            if (address && contacts) {
                this.selectDefaultContact(selections, contacts);
                this.setState(_extends({ address: address, contacts: contacts }, selections));
                this.fetchIssues();
            } else {
                this.goHome();
            }
        }
    }, {
        key: "goHome",
        value: function goHome() {
            this.props.router.push("/");
        }
    }, {
        key: "setLiteners",
        value: function setLiteners() {
            this._offs.push(this._mediaEvents.onScreenResize(this.onScreenResize.bind(this)));
        }
    }, {
        key: "persistSelection",
        value: function persistSelection(args) {
            this._userStore.set("selections", _extends({}, args));
        }
    }, {
        key: "showProgress",
        value: function showProgress(_showProgress) {
            this.setState({ showProgress: _showProgress });
        }
    }, {
        key: "fetchIssues",
        value: function fetchIssues() {
            var _this2 = this;

            this.showProgress(true);
            this._cwcServer.fetchIssues().then(function (issues) {
                var issueIdSelected = _this2.state.issueIdSelected;
                if (_this2._utils.isNullOrUndefined(issueIdSelected)) {
                    // Select initial default issue
                    issueIdSelected = issues && issues[0] && issues[0].id;
                }
                _this2.setState({ issues: issues, issueIdSelected: issueIdSelected });
                _this2.showProgress(false);
                _this2.fetchTemplatesForIssueIfNeeded(issueIdSelected);
            }, function () {
                _this2.showProgress(false);
            });
        }
    }, {
        key: "fetchTemplatesForIssueIfNeeded",
        value: function fetchTemplatesForIssueIfNeeded(issueId) {
            var _this3 = this;

            var mustFetchTemplates = issueId && (!this.state.templates || !this.state.templates.issueId);
            if (mustFetchTemplates) {
                return this.fetchTemplatesForIssue(issueId).then(function (templates) {
                    _this3.setState({ templates: templates });
                });
            }
        }
    }, {
        key: "waitForAllPromises",
        value: function waitForAllPromises(promises) {
            var wrappedPromises = promises.map(function (promise) {
                return new _Promise(function (resolve) {
                    promise.then(function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        resolve(args);
                    }, function () {
                        resolve();
                    });
                });
            });
            return Promise.all(wrappedPromises);
        }
    }, {
        key: "fetchTemplatesForIssue",
        value: function fetchTemplatesForIssue(issueId) {
            var _this4 = this;

            this.showProgress(true);
            var address = this.state.address;
            var templates = {};
            var promises = _soloApplication.Application.configuration.officialLevels.map(function (level) {
                return _this4._cwcServer.fetchTemplate(issueId, address.state, level).then(function (templatesForIssueAndState) {
                    templates[level] = templatesForIssueAndState;
                });
            });
            //return Promise.all(promises)
            return this.waitForAllPromises(promises).then(function () {
                _this4.showProgress(false);
                return templates;
            }, function () {
                _this4.showProgress(false);
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.updatePaperStyle();
            global.document.addEventListener("keydown", this.keypressHandler.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._offs.forEach(function (off) {
                return off();
            });
            global.document.removeEventListener("keydown", this.keypressHandler.bind(this));
        }
    }, {
        key: "keypressHandler",
        value: function keypressHandler(event) {
            this._events.fire("cwc:keydown", event);
        }
    }, {
        key: "onScreenResize",
        value: function onScreenResize() {
            this.updatePaperStyle();
        }
    }, {
        key: "paperRef",
        value: function paperRef(ref) {
            if (this._paperRef !== ref) {
                this._paperRef = ref;
            }
        }
    }, {
        key: "appBarPaperWrapperRef",
        value: function appBarPaperWrapperRef(ref) {
            if (this._appBarPaperWrapperRef !== ref) {
                this._appBarPaperWrapperRef = ref;
            }
        }
    }, {
        key: "updatePaperStyle",
        value: function updatePaperStyle() {
            if (!this._paperRef || !this._appBarPaperWrapperRef) {
                return;
            }

            var margin = 20;
            var availableWidth = this._appBarPaperWrapperRef.offsetWidth /* - this._paperRef.offsetLeft */ - margin * 2;
            var availableHeight = this._appBarPaperWrapperRef.offsetHeight - this._paperRef.offsetTop - margin;

            // Letter size = 215.9 by 279.4
            // 215.9 : 279.4 = availableWidth : availableHeight
            var paperWidth = 0;
            var paperHeight = _letterConstants2.default.letterHeightPx * availableWidth / _letterConstants2.default.letterWidthPx;
            if (paperHeight <= availableHeight) {
                paperWidth = availableWidth;
            } else {
                paperHeight = availableHeight;
                paperWidth = _letterConstants2.default.letterWidthPx * availableHeight / _letterConstants2.default.letterHeightPx;
            }

            var paperStyle = {
                height: paperHeight,
                width: paperWidth,
                textAlign: "center",
                display: "inline-block"
            };
            this.setState({ paperStyle: paperStyle, availableWidth: availableWidth });
        }
    }, {
        key: "findSelectedContact",
        value: function findSelectedContact() {
            var _this5 = this;

            var _state = this.state,
                contacts = _state.contacts,
                contactIdSelected = _state.contactIdSelected;

            if (contacts && !this._utils.isNullOrUndefined(contactIdSelected)) {
                var _ret = function () {
                    var contact = void 0;
                    Object.keys(_this5.state.contacts).find(function (level) {
                        contact = _this5.state.contacts[level].find(function (contact) {
                            return contact.id === contactIdSelected;
                        });
                        if (contact) {
                            contact.level = level;
                        }
                        return !!contact;
                    });
                    return {
                        v: contact
                    };
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }, {
        key: "fulFillTemplate",
        value: function fulFillTemplate(templateContent, contact, address) {
            //templateContent = templateContent.replace(/\n/g, "<br>");
            templateContent = templateContent.replace(/\[NAME_OF_REPRESENTATIVE\]/g, contact.name || "");
            templateContent = templateContent.replace(/\[NAME_OF_USER\]/g, address.name || "");
            templateContent = templateContent.replace(/\[STATE\]/g, address.state || "");
            return templateContent;
        }
    }, {
        key: "getTempleateContent",
        value: function getTempleateContent(fulfillAndReplace) {
            var contact = this.findSelectedContact();
            var address = this.state.address;

            if (address && contact) {
                var templateContent = this.customTemplate || this.state.templates && this.state.templates[contact.level] && this.state.templates[contact.level].content;
                if (templateContent) {
                    if (fulfillAndReplace) {
                        templateContent = this.fulFillTemplate(templateContent, contact, address);
                    }
                    return templateContent;
                }
            }
        }
    }, {
        key: "onEditTemplate",
        value: function onEditTemplate() {
            this.setState({ showTemplateEditDialog: true });
        }
    }, {
        key: "onCancelTemplateEditDialog",
        value: function onCancelTemplateEditDialog() {
            this.setState({ showTemplateEditDialog: false });
        }
    }, {
        key: "onSaveTemplateEditDialog",
        value: function onSaveTemplateEditDialog(template) {
            this.customTemplate = template;
            this.setState({ showTemplateEditDialog: false });
        }
    }, {
        key: "onRestoreTemplateEditDialog",
        value: function onRestoreTemplateEditDialog() {
            this.customTemplate = null;
        }
    }, {
        key: "onEditUser",
        value: function onEditUser() {
            this.setState({ showAddressEditDialog: true });
        }
    }, {
        key: "onCancelAddressEditDialog",
        value: function onCancelAddressEditDialog() {
            this.setState({ showAddressEditDialog: false });
        }
    }, {
        key: "onSaveAddressEditDialog",
        value: function onSaveAddressEditDialog(address) {
            this._userStore.set("address", _extends({}, address));
            this.setState({ showAddressEditDialog: false, address: address });
        }
    }, {
        key: "onIssueChange",
        value: function onIssueChange(event, index, issueIdSelected) {
            this.persistSelection({ issueIdSelected: issueIdSelected });
            this.setState({ issueIdSelected: issueIdSelected });
            this.fetchTemplatesForIssueIfNeeded(issueIdSelected);
        }
    }, {
        key: "onContactChange",
        value: function onContactChange(event, index, contactIdSelected) {
            if (!this._utils.isNullOrUndefined(contactIdSelected)) {
                this.persistSelection({ contactIdSelected: contactIdSelected });
                this.setState({ contactIdSelected: contactIdSelected });
            }
        }
    }, {
        key: "setSelectParentWidth",
        value: function setSelectParentWidth(ref) {
            if (ref && this.state.componentParentWidth !== ref.offsetWidth) {
                this.setState({ componentParentWidth: ref.offsetWidth });
            }
        }
    }, {
        key: "select",
        value: function select(_ref2) {
            var Component = _ref2.Component,
                props = _ref2.props,
                number = _ref2.number;

            return _react2.default.createElement(
                "div",
                { className: "dashboard__numbered-step-wrapper" },
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__numbered-step-wrapper__number" },
                    _react2.default.createElement(_NumberInCircle2.default, { size: "20", number: number })
                ),
                _react2.default.createElement(
                    "div",
                    { ref: this.setSelectParentWidth.bind(this), className: "dashboard__numbered-step-wrapper__select" },
                    _react2.default.createElement(Component, _extends({ parendWidth: this.state.componentParentWidth }, props))
                )
            );
        }
    }, {
        key: "printTemplate",
        value: function printTemplate() {
            var _ref3 = this._userStore.get("settings") || {},
                doNotShowPrintWarning = _ref3.doNotShowPrintWarning;

            if (!doNotShowPrintWarning) {
                this.setState({ showPrintWarningDialog: true });
            } else {
                this.sendStatisticAndBrowserPrint();
            }
        }
    }, {
        key: "onCancelPrintWarningDialog",
        value: function onCancelPrintWarningDialog() {
            this.setState({ showPrintWarningDialog: false });
        }
    }, {
        key: "onOkPrintWarningDialog",
        value: function onOkPrintWarningDialog(doNotShowPrintWarning) {
            var _this6 = this;

            this.setState({ showPrintWarningDialog: false });
            this._userStore.set("settings", { doNotShowPrintWarning: doNotShowPrintWarning });
            setTimeout(function () {
                _this6.sendStatisticAndBrowserPrint();
            }, 1000);
        }
    }, {
        key: "sendStatisticAndBrowserPrint",
        value: function sendStatisticAndBrowserPrint() {
            var _currentProps = this.currentProps,
                issueId = _currentProps.issueId,
                state = _currentProps.state,
                level = _currentProps.level;

            this._cwcServer.sendPrintStatistics({ issueId: issueId, state: state, level: level });
            this._analytics.sendPrintEvent({ issueId: issueId, state: state, level: level });
            window.print();
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.address || !this.state.contacts) {
                return null;
            }
            return _react2.default.createElement(
                "div",
                { className: "dashboard" },
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__no-print" },
                    _react2.default.createElement(_AddressEditDialog2.default, {
                        shouldShow: this.state.showAddressEditDialog,
                        onCancel: this.onCancelAddressEditDialog.bind(this),
                        onSave: this.onSaveAddressEditDialog.bind(this),
                        address: this.state.address
                    }),
                    _react2.default.createElement(_TemplateEditDialog2.default, {
                        shouldShow: this.state.showTemplateEditDialog,
                        onCancel: this.onCancelTemplateEditDialog.bind(this),
                        onSave: this.onSaveTemplateEditDialog.bind(this),
                        onRestore: this.onRestoreTemplateEditDialog.bind(this),
                        templateContent: this.getTempleateContent(true)
                    }),
                    _react2.default.createElement(_PrintWarningDialog2.default, {
                        shouldShow: this.state.showPrintWarningDialog,
                        onCancel: this.onCancelPrintWarningDialog.bind(this),
                        onOk: this.onOkPrintWarningDialog.bind(this)
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__spacer-and-appbar-paper-wrapper dashboard__no-print" },
                    _react2.default.createElement(
                        "div",
                        { ref: this.appBarPaperWrapperRef.bind(this), className: "dashboard__appbar-paper-wrapper" },
                        _react2.default.createElement(_AppHeader2.default, {
                            router: this.props.router,
                            onPrint: this.printTemplate.bind(this)
                        }),
                        _react2.default.createElement(
                            "div",
                            { className: "dashboard__numbered-steps" },
                            this.issuesSelect,
                            this.contactsSelect,
                            this.thirdStep
                        ),
                        _react2.default.createElement(
                            "div",
                            { ref: this.paperRef.bind(this), className: "dashboard__paper-wrapper" },
                            _react2.default.createElement(
                                _Paper2.default,
                                { style: this.state.paperStyle, zDepth: 2 },
                                _react2.default.createElement(_Letter2.default, this.letterProps)
                            )
                        )
                    ),
                    _react2.default.createElement(_CommonUi.ProgressOverlay, { showProgress: this.state.showProgress })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__print-only" },
                    _react2.default.createElement(_Letter2.default, _extends({}, this.letterProps, { forPrint: true }))
                )
            );
        }
    }, {
        key: "isProgressShowing",
        get: function get() {
            return this.state.showProgress;
        }
    }, {
        key: "currentProps",
        get: function get() {
            var _this7 = this;

            var _ref4 = this.state && this.state.address,
                state = _ref4.state,
                zip = _ref4.zip;

            var issue = this.state.issues && this.state.issues.find(function (issue) {
                return issue.id === _this7.state.issueIdSelected;
            });
            var contact = this.findSelectedContact();

            return {
                state: state,
                zip: zip,
                level: contact && contact.level,
                contactId: contact && contact.id,
                issueId: issue && issue.id,
                issueName: issue && issue.name,
                fetchingData: this.isProgressShowing
            };
        }
    }, {
        key: "letterProps",
        get: function get() {
            return _extends({
                addressFrom: this.state.address,
                addressTo: this.findSelectedContact(),
                templateContent: this.getTempleateContent(true),
                height: this.state.paperStyle.height,
                width: this.state.paperStyle.width,
                onEditTemplate: this.onEditTemplate.bind(this),
                onEditUser: this.onEditUser.bind(this)
            }, this.currentProps);
        }
    }, {
        key: "customTemplateId",
        get: function get() {
            return "customTeplate-" + this.state.issueIdSelected + "-" + this.state.address.state;
        }
    }, {
        key: "customTemplate",
        get: function get() {
            var customTemplate = this._userStore.get(this.customTemplateId);
            return customTemplate && customTemplate.value;
        },
        set: function set(value) {
            if (value) {
                this._userStore.set(this.customTemplateId, { value: value });
            } else {
                this._userStore.remove(this.customTemplateId);
            }
        }
    }, {
        key: "issuesSelect",
        get: function get() {
            return this.select({
                Component: _IssuesSelect2.default,
                props: {
                    selectedId: this.state.issueIdSelected,
                    issues: this.state.issues,
                    maxWidth: this.state.availableWidth,
                    onChange: this.onIssueChange.bind(this)
                },
                number: 1
            });
        }
    }, {
        key: "contactsSelect",
        get: function get() {
            return this.select({
                Component: _ContactsSelect2.default,
                props: {
                    selectedId: this.state.contactIdSelected,
                    contacts: this.state.contacts,
                    maxWidth: this.state.availableWidth,
                    onChange: this.onContactChange.bind(this)
                },
                number: 2
            });
        }
    }, {
        key: "thirdStep",
        get: function get() {
            return _react2.default.createElement(
                "div",
                { className: "dashboard__numbered-step-wrapper" },
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__numbered-step-wrapper__number" },
                    _react2.default.createElement(_NumberInCircle2.default, { size: "20", number: 3 })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "dashboard__numbered-step-wrapper__select" },
                    _react2.default.createElement(
                        "div",
                        { className: "dashboard__numbered-step-wrapper___text-only-step" },
                        _soloApplication.Application.localize("dashboard/personalizeLetter"),
                        _react2.default.createElement(
                            "i",
                            { className: "dashboard__numbered-step-wrapper___text-only-step__icon material-icons",
                                onClick: this.printTemplate.bind(this)
                            },
                            "print"
                        )
                    )
                )
            );
        }
    }]);

    return Dashboard;
}(_react2.default.Component);

exports.default = Dashboard;