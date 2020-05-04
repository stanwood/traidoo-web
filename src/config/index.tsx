import Configuration from "./interface";

const Config: Configuration = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientName: process.env.REACT_APP_CLIENT_NAME,
  themePalettePrimaryColor: process.env.REACT_APP_THEME_PALETTE_PRIMARY_COLOR,
  themePaletteSecondaryColor:
    process.env.REACT_APP_THEME_PALETTE_SECONDARY_COLOR,
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT
};

export default Config;
