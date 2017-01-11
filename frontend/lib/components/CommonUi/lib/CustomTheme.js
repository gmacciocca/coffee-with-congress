"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _colors = require("material-ui/styles/colors");

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _colorManipulator = require("material-ui/utils/colorManipulator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Application } from "solo-application";
//const JSON_THEME_COLORS = "../resources/themeColors.json";
// import JSON_THEME_COLORS from "../resources/themeColors.json";

//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
var JSON_THEME_COLORS = require("../../../../build/themeColors.json");

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors

// const { themeColors } = Application.configuration;

//import AppBar from "material-ui/AppBar";
var GREEN = "#00ff00";

var muiTheme = (0, _getMuiTheme2.default)({
    // palette: {
    //     textColor: "red",
    // },
    appBar: {
        color: JSON_THEME_COLORS.themeColors.headerAndLogo,
        textColor: JSON_THEME_COLORS.themeColors.contrastText
    },
    palette: {
        primary1Color: JSON_THEME_COLORS.themeColors.headerAndLogo, //  cyan500,
        primary2Color: JSON_THEME_COLORS.themeColors.headerAndLogo, // cyan700,
        primary3Color: JSON_THEME_COLORS.themeColors.headerAndLogo, // grey400,
        accent1Color: JSON_THEME_COLORS.themeColors.alertText, // pinkA200,
        accent2Color: GREEN, // grey100,
        accent3Color: GREEN, // grey500,
        textColor: JSON_THEME_COLORS.themeColors.mainText, // darkBlack,
        alternateTextColor: JSON_THEME_COLORS.themeColors.contrastText, // white,
        canvasColor: JSON_THEME_COLORS.themeColors.mainBackground, // white,
        borderColor: JSON_THEME_COLORS.themeColors.contrastBackground, // grey300,
        disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
        pickerHeaderColor: JSON_THEME_COLORS.themeColors.headerAndLogo, // cyan500,
        clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
        shadowColor: _colors.fullBlack
    },
    textField: {
        // hintColor: palette.disabledColor,
        floatingLabelColor: JSON_THEME_COLORS.themeColors.hintColor, // palette.disabledColor,
        errorColor: JSON_THEME_COLORS.themeColors.alertText }
});

exports.default = muiTheme;