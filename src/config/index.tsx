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
  gaTrackingID: process.env.REACT_APP_GA_TRACKING_ID,
  sponsorLogo: process.env.REACT_APP_SPONSOR_LOGO,
  compantTypesVariant: process.env.REACT_APP_COMPANY_TYPES_VARIANT || "A",
  intercomId: process.env.REACT_APP_INTERCOM_ID,
  features: {
    routes: process.env.REACT_APP_FEATURE_ROUTES,
  },
};

export default Config;
