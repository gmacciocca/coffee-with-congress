"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailTo = function EmailTo(_ref) {
    var email = _ref.email;

    return _react2.default.createElement(
        "a",
        { href: "mailto:" + email, target: "_top" },
        email
    );
};

var FaqText = function FaqText() {
    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "h5",
                null,
                "How can I help write a template?"
            ),
            "Drop us a line at ",
            _react2.default.createElement(EmailTo, { email: "writers@writetocongress.org" }),
            " with your information and a writing sample (no more than 1 page).",
            _react2.default.createElement(
                "h5",
                null,
                "Why can\u2019t I write a letter longer than one page?"
            ),
            "Because the letter loses its effectiveness. Elected officials are busy and we have to get straight to the point.",
            _react2.default.createElement(
                "h5",
                null,
                "I run a media / news site - can I feature Write to Congress to my readers?"
            ),
            "We\u2019d love it - drop us a line at ",
            _react2.default.createElement(EmailTo, { email: "media@writetocongress.org" }),
            ".",
            _react2.default.createElement(
                "h5",
                null,
                "Why do I have to enter my full address? And what do you do with it?"
            ),
            "Cities are broken down into multiple districts, which have different representatives in the House. To give you the right list of people to contact, we need your address. You also need to list your address on your letter to prove you are really a constituent in that official\u2019s jurisdiction. Write to Congress does not record your address, or the letter you customize, in any way, shape or form.",
            _react2.default.createElement(
                "h5",
                null,
                "I am getting \u2019no officials found\u2019 when I type in my address - why?"
            ),
            "Please send us your info ",
            _react2.default.createElement(
                "a",
                { href: "https://docs.google.com/a/writetocongress.org/forms/d/e/1FAIpQLSc7N9tYMmg5rP0MRCvHu-z9w_7jyCqN7gB4tkjB4Xj3NUpoWw/viewform", target: "_blank" },
                "here"
            ),
            " and we\u2019ll get back to you as soon as possible.",
            _react2.default.createElement(
                "h5",
                null,
                "The elected official I chose has no address - why?"
            ),
            "This means address is not available through the Google Civics API. We encourage you to still try calling the office or writing other officials.",
            _react2.default.createElement(
                "h5",
                null,
                " Wait, is this email or snail mail?"
            ),
            "Snail mail.  Email gets easily filtered and organized by algorithms without ever being read.  You have to really explain your needs as a constituent, print the letter and mail it.  It\u2019s all about the phone calls and letters!",
            _react2.default.createElement(
                "h5",
                null,
                "I represent a nonprofit - how can our supporters use this?"
            ),
            "Contact us at ",
            _react2.default.createElement(EmailTo, { email: "nonprofits@writetocongress.org" }),
            ".",
            _react2.default.createElement(
                "h5",
                null,
                "I see a typo in one of the letters - should I tell you or troll you?"
            ),
            "Tell us!  We\u2019re working at all hours so your proofreading prowess is welcomed.  Contact us at ",
            _react2.default.createElement(EmailTo, { email: "writers@writetocongress.org" }),
            " with the Issue, Elected Official and State of the letter (and the typo!).  Meanwhile, you can edit your letter to make it perfect.",
            _react2.default.createElement(
                "h5",
                null,
                "How do I know which elected official I should be writing to?"
            ),
            "Do a quick Google search on the topic to see how far along the bill is in the process. When in doubt, write both.",
            _react2.default.createElement(
                "h5",
                null,
                "I have another question that\u2019s not answered here - how do I reach you?"
            ),
            "E-mail us at ",
            _react2.default.createElement(EmailTo, { email: "info@writetocongress.org" })
        )
    );
};

exports.default = FaqText;