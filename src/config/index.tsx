import Configuration from "./interface";

const Config: Configuration = {
  debug: process.env.DEBUG,
  environment: process.env.ENVIRONMENT,
  clientId: process.env.CLIENT_ID,
  clientName: process.env.CLIENT_NAME,
  themePalettePrimaryColor: process.env.THEME_PALETTE_PRIMARY_COLOR,
  themePaletteSecondaryColor: process.env.THEME_PALETTE_SECONDARY_COLOR,
  apiEndpoint: process.env.API_ENDPOINT,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  sentryDSN: process.env.SENTRY_DSN,
  features: {
    routes: process.env.FEATURE_ROUTES,
  },
};

export default Config;
