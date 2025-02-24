import { getRemFontSizeByPx } from "../../utils";

const darkBlue = "#0065AB";
const primaryColor = "#0092DD";
const infoColor = "#61C2FF";
const brightGreen = "#1DFF00";
const successColor = "#54B948";
const dangerColor = "#FF0000";
const warningColor = "#DD9900";
const black100 = "#333333";
const black86 = "#4F4F4F";
const black60 = "#858585";
const black36 = "#B5B5B5";
const black16 = "#DEDEDE";
const black4 = "#F7F7F7";
const offWhite = "#F8FCFF";

const theme = {
  palette: {
    background: {
      default: offWhite,
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primaryColor,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#919191",
    },
    // error: will use the default color
    action: {
      // hover: "#f44336",
    },
  },
  typography: {
    h1: {
      fontFamily: "Poppins, sans-serif",
      color: black86,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      color: black86,
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      color: black86,
    },
    h4: {
      fontFamily: "Poppins, sans-serif",
      color: black86,
    },
    h5: {
      fontFamily: "Poppins, sans-serif",
      color: black86,
    },
    h6: {
      fontFamily: "Poppins, sans-serif",
      color: black86,
    },
  },
  overrides: {
    Qongfu: {
      link: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 300,
        fontSize: getRemFontSizeByPx(15),
        color: black60,
        margin: "0 15px",
        textDecoration: "none",
        "&:hover": {
          color: primaryColor,
          fontWeight: 500,
        },
      },
      linkActive: {
        fontWeight: 500,
        color: primaryColor,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 16,
      },
    },
    MuiButton: {
      root: {
        fontFamily: "Poppins, sans-serif",
        fontSize: getRemFontSizeByPx(14),
        padding: "2px 8px",
      },
      textSizeLarge: {
        fontSize: getRemFontSizeByPx(16),
        fontWeight: 500,
      },
      textSizeSmall: {
        fontWeight: 500,
      },
      contained: {
        boxShadow: "none",
        borderRadius: 30,
        padding: "10px 16px",
      },
      outlined: {
        boxShadow: "none",
        borderRadius: 30,
        padding: "10px 16px",
      },
      containedSecondary: {
        borderRadius: 4,
        padding: "10px 16px",
      },
      outlinedSizeLarge: {
        fontSize: getRemFontSizeByPx(18),
        fontWeight: 500,
        padding: "13px 22px",
      },
      outlinedSizeSmall: {
        fontSize: getRemFontSizeByPx(14),
      },
      containedSizeLarge: {
        fontSize: getRemFontSizeByPx(18),
        fontWeight: 500,
        padding: "13px 22px",
      },
      containedSizeSmall: {
        fontSize: getRemFontSizeByPx(14),
      },
    },
    MuiContainer: {
      maxWidthLg: {
        padding: 0,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: "30px",
      },
    },
  },
  custom: {
    darkBlue,
    primaryColor,
    infoColor,
    brightGreen,
    successColor,
    dangerColor,
    warningColor,
    black100,
    black86,
    black60,
    black36,
    black16,
    black4,
    offWhite,
  },
};

export default theme;
