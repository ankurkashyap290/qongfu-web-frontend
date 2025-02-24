import { SheetsRegistry } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";

const theme = {
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#0092DD",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#919191",
    },
    // error: will use the default color
    action: {
      hover: "#f44336",
    },
  },
};

const createPageContext = () => {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName(),
  };
};
//@ts-ignore
let pageContext;

const getPageContext = () => {
  if (!process.browser) {
    return createPageContext();
  }

  //@ts-ignore
  if (!pageContext) {
    pageContext = createPageContext();
  }

  //@ts-ignore
  return pageContext;
};

export default getPageContext;
