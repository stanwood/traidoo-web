import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Config from "./config";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: Config.themePalettePrimaryColor,
    },
    secondary: {
      main: Config.themePaletteSecondaryColor,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1440,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
