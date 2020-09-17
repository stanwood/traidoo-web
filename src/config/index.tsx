import Configuration from "./interface";

const Config: Configuration = {
  debug: process.env.REACT_APP_DEBUG,
  environment: process.env.REACT_APP_ENVIRONMENT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientName: process.env.REACT_APP_CLIENT_NAME,
  themePalettePrimaryColor: process.env.REACT_APP_THEME_PALETTE_PRIMARY_COLOR,
  themePaletteSecondaryColor:
    process.env.REACT_APP_THEME_PALETTE_SECONDARY_COLOR,
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN,
  gtmID: process.env.REACT_APP_GTM_ID,
  gaTrackingID: process.env.REACT_APP_GTM_ID,
  features: {
    routes: process.env.REACT_APP_FEATURE_ROUTES,
  },
};

export default Config;
