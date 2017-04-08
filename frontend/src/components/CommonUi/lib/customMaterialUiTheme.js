import { darkBlack, fullBlack } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { fade } from "material-ui/utils/colorManipulator";
var JSON_THEME_COLORS = require("../../../../build/jsonToCssProperties.json");

const GREEN = "#00ff00";

const customMaterialUiTheme = getMuiTheme({
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
        floatingLabelColor: JSON_THEME_COLORS.themeColors.labelColor, // palette.disabledColor,
        errorColor: JSON_THEME_COLORS.themeColors.alertText, // red500,
    },
});

export default customMaterialUiTheme;
