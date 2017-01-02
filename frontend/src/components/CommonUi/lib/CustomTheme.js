import React from "react";
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from "material-ui/styles/colors";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
//import AppBar from "material-ui/AppBar";
import { fade } from "material-ui/utils/colorManipulator";
// import { Application } from "solo-application";
//const JSON_THEME_COLORS = "../resources/themeColors.json";
// import JSON_THEME_COLORS from "../resources/themeColors.json";
var JSON_THEME_COLORS = require("../../../../build/themeColors.json");

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors

// const { themeColors } = Application.configuration;

const GREEN = "#00ff00";

const muiTheme = getMuiTheme({
    // palette: {
    //     textColor: "red",
    // },
    appBar: {
        color: JSON_THEME_COLORS.themeColors.headerAndLogo,
        textColor: JSON_THEME_COLORS.themeColors.contrastText,
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
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: JSON_THEME_COLORS.themeColors.headerAndLogo, // cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    textField: {
        // hintColor: palette.disabledColor,
        floatingLabelColor: JSON_THEME_COLORS.themeColors.hintColor, // palette.disabledColor,
        errorColor: JSON_THEME_COLORS.themeColors.alertText, // red500,
        //backgroundColor: "transparent",
    },
});

export default muiTheme;
