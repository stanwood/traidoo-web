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
    REACT_APP_GA_TRACKING_ID: string;
    REACT_APP_SPONSOR_LOGO: string | null;
    REACT_APP_COMPANY_TYPES_VARIANT: null | "A" | "B";
    REACT_APP_INTERCOM_ID: string;
    REACT_APP_CURRENCY: string;
    REACT_APP_REGISTRATION_COMPANY_ID: "true" | "false";
    REACT_APP_REGISTRATION_UID: "true" | "false";
    REACT_APP_CART_LIMIT: number;
  }
}
