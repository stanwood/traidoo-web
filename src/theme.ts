import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Config from "./config";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: Config.themePalettePrimaryColor
    },
    secondary: {
      main: Config.themePaletteSecondaryColor
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
