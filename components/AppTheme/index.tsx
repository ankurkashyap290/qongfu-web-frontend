import React, { FunctionComponent } from "react";
import { ThemeProvider, createMuiTheme, Direction } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { createGenerateClassName, jssPreset, StylesProvider } from "@material-ui/core/styles";
import customTheme from "./theme";

interface Props {
  direction?: Direction;
  language?: "en";
}

const AppTheme: FunctionComponent<Props> = ({ direction, language, children }) => {
  // Configure JSS
  const plugins = [...jssPreset().plugins];
  if (direction === "rtl") {
    plugins.push(rtl());
  }
  const languageStyles = {};
  if (language !== "en") {
    // languageStyles = import('@material-ui/core/locale');
  }
  const jss = create({ plugins: [...plugins] });
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme(
    {
      ...customTheme,
      direction,
    },
    languageStyles
  );

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default AppTheme;
