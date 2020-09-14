/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_DEBUG: boolean;
    REACT_APP_ENVIRONMENT: string;
    REACT_APP_CLIENT_ID: string;
    REACT_APP_CLIENT_NAME: string;
    REACT_APP_THEME_PALETTE_PRIMARY_COLOR: string;
    REACT_APP_THEME_PALETTE_SECONDARY_COLOR: string;
    REACT_APP_API_ENDPOINT: string;
    REACT_APP_GOOGLE_MAPS_API_KEY: string;
    REACT_APP_SENTRY_DSN: string;
    REACT_APP_FEATURE_ROUTES: boolean;
  }
}