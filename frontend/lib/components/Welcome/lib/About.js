"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _soloApplication = require("solo-application");

var _Footer = require("./Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _Avatar = require("material-ui/Avatar");

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require("material-ui/List/List");

var _List2 = _interopRequireDefault(_List);

var _ListItem = require("material-ui/List/ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

var _aboutPeople = require("./aboutPeople");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// class UserProfile extends React.Component {
//     constructor(...args) {
//         super(...args);
//         this._gravatar = Application.roles.gravatar;
//         this.state = {
//             name: this.props.person.name,
//             bio: null,
//             photoUrl: this.props.person.photoUrl
//         };
//     }
//
//     // componentWillMount() {
//     //     this._gravatar.fetchUserInfo(this.props.emailHash)
//     //     .then(userInfo => {
//     //         this.setState(...userInfo);
//     //     });
//     // }
//
//     render() {
//         return (
//             <ListItem
//                 key={this.state.name}
//                 disabled={true}
//                 leftAvatar={<Avatar src={this.state.photoUrl} />}
//             >
//                 <div>{this.state.name}</div>
//                 <div>{this.state.bio}</div>
//             </ListItem>
//         );
//     }
// }

var About = function (_React$Component) {
    _inherits(About, _React$Component);

    function About() {
        var _ref;

        _classCallCheck(this, About);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = About.__proto__ || Object.getPrototypeOf(About)).call.apply(_ref, [this].concat(args)));

        _this.appHeader = _soloApplication.Application.roles.uiAppHeader;
        return _this;
    }

    _createClass(About, [{
        key: "render",
        value: function render() {
            var AppHeader = this.appHeader;

            return _react2.default.createElement(
                "div",
                { className: "mission" },
                _react2.default.createElement(AppHeader, {
                    router: this.props.router
                }),
                _react2.default.createElement(
                    "div",
                    { className: "mission__wrapper" },
                    _react2.default.createElement(
                        "h3",
                        null,
                        _soloApplication.Application.localize("footer/aboutUs")
                    ),
                    _react2.default.createElement(_aboutPeople.AboutText, null),
                    _react2.default.createElement(
                        _List2.default,
                        null,
                        _aboutPeople.aboutPeople.map(function (person) {
                            //const BioComponent = person.bioComponent;
                            return _react2.default.createElement(
                                _ListItem2.default,
                                {
                                    key: person.name,
                                    disabled: true,
                                    leftAvatar: _react2.default.createElement(_Avatar2.default, { src: person.photoUrl })
                                },
                                _react2.default.createElement(
                                    "div",
                                    { className: "welcome__about__person__name" },
                                    person.name
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "welcome__about__person__bio" },
                                    person.bioComponent
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return About;
}(_react2.default.Component);

exports.default = About;