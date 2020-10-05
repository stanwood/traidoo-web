import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Config from "./config";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: Config.themePalettePrimaryColor,
      light: '#ff0000',
      dark: '#00ff00',
      contrastText: '#ffffff'
    },
    secondary: {
      main: Config.themePaletteSecondaryColor,
      light: '#0066ff',
      dark: '#ff0000',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#5e5e5e',
      secondary: '#9a9a9a'
    }
  },
  typography: {
    fontFamily: [
      'OpenSans',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontSize: 14,
    h4: {
      fontWeight: 800,
      fontSize: 20
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600,
      fontSize: 14
    }
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
  overrides: {
    MuiTableCell: {
      root: {
        padding: "16px 8px",
      },
      head: {
        background: "#f2f2f2",
        color: "#5e5e5e",
        textTransform: "uppercase",
        size: 10
      }
    },
    MuiTablePagination: {
      root: {
        color: "#9a9a9a"
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
