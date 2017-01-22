"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.aboutPeople = exports.AboutText = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkTo = function LinkTo(_ref) {
    var url = _ref.url,
        urlName = _ref.urlName;

    return _react2.default.createElement(
        "a",
        { href: url, target: "_blank" },
        urlName
    );
};

var AboutText = function AboutText() {
    return _react2.default.createElement(
        "div",
        null,
        "We are not a business, nonprofit or school.  We are simply of a group of people who want to help American citizens protect freedom, so we started this project.  We are scattered across the globe and have full-time jobs.  But we believe we are citizens of the world who must help one another.  (Our project and its views do not represent our employers.)  Some writers and developers did not feel comfortable being publicly listed for fear of retaliation."
    );
};

var TanujaBio = function TanujaBio() {
    return _react2.default.createElement(
        "div",
        null,
        "Tanuja has been with Google for six years, serving as a program manager on the Docs engineering team. Prior to Google, she was a Product Manager at Barnes & Noble.com and Broadway.com. Parallel to her 16+ year career in ecommerce and software development, Tanuja tutors math through\xA0",
        _react2.default.createElement(LinkTo, { url: "http://www.tophonors.org/", urlName: "Top Honors" }),
        "\xA0for 7 years and counting. In 2013, she started a complementary middle school reading program\xA0",
        _react2.default.createElement(LinkTo, { url: "http://www.booksandbreakfast.org/", urlName: "Books & Breakfast" }),
        "\xA0in her neighborhood. She worked extensively with the Hurricane Sandy recovery efforts and organized an initiative to help hundreds of local residents restore their homes from mold and water damage. Born to immigrants from the India, Tanuja earned her Bachelor's of Science from New York University. At 20, she launched her first commercial website and never looked back."
    );
};

var JuliaBio = function JuliaBio() {
    return _react2.default.createElement(
        "div",
        null,
        "Concerned American.  Advocate of a democracy that serves all the peoples. Believer in the collective power of individuals who raise up communities. Recognizer of a government's core responsibility to promote and enable a prosperous country -- as measured by its ability to protect its weakest citizens. Privileged person because of all of the above."
    );
};

var YashodaBio = function YashodaBio() {
    return _react2.default.createElement(
        "div",
        null,
        "Lifelong politico with opinions to spare. In her present life, Yashoda Sampath plans and performs user experience research, making sure that the voice of the user is represented at all stages of the design process. In her many past lives, Yashoda has worked for the British government, an environmental design agency, political campaigns, a really terrible rock band, and an international newspaper. All these jobs have one common thread: Yashoda gets to ask a shitload of questions about why people behave the way they do."
    );
};

var KavitaBio = function KavitaBio() {
    return _react2.default.createElement(
        "div",
        null,
        "Contributor."
    );
};

var ChadBio = function ChadBio() {
    return _react2.default.createElement(
        "div",
        null,
        "Contributor, independent, researcher, writer to congress, patriot, volunteer, AIDS/LifeCycle Rider."
    );
};

var GianlucaBio = function GianlucaBio() {
    return _react2.default.createElement(
        "div",
        null,
        "Developer, activist and philanthropist.",
        _react2.default.createElement("br", null),
        "Gianluca is a C++/Javascript programmer who has worked at many startups, and corporates in both the Bay Area and New York. He currently works at Barnes & Noble.com building out higher education software. He immigrated to the US from Italy in 1994, and obtained his citizenship in 2016, during one of the most contentious presidential campaigns. Gianluca actively volunteered in Staten Island and the Rockaways during Hurricane Sandy to help hundreds of local residents clean, restore and rebuild their homes. He and his partner are proof that we have too much at stake to not fight."
    );
};

var aboutPeople = [{
    name: "Tanuja Gupta",
    photoUrl: "./images/tanuja.jpg",
    bioComponent: _react2.default.createElement(TanujaBio, null)
}, {
    name: "Gianluca Macciocca",
    photoUrl: "http://gravatar.com/avatar/e4e39436859e90abb970ef9e8eff28fe",
    bioComponent: _react2.default.createElement(GianlucaBio, null)
}, {
    name: "Yashoda Sampath",
    photoUrl: "./images/yashoda.jpg",
    bioComponent: _react2.default.createElement(YashodaBio, null)
}, {
    name: "Chad Walters",
    photoUrl: "./images/chad.jpg",
    bioComponent: _react2.default.createElement(ChadBio, null)
}, {
    name: "Julia Kang",
    photoUrl: "./images/sil.png",
    bioComponent: _react2.default.createElement(JuliaBio, null)
}, {
    name: "Kavita Jain-Cocks",
    photoUrl: "./images/kavita.jpg",
    bioComponent: _react2.default.createElement(KavitaBio, null)
}];

exports.AboutText = AboutText;
exports.aboutPeople = aboutPeople;