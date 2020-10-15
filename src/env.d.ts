/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    DEBUG: boolean;
    ENVIRONMENT: string;
    CLIENT_ID: string;
    CLIENT_NAME: string;
    THEME_PALETTE_PRIMARY_COLOR: string;
    THEME_PALETTE_SECONDARY_COLOR: string;
    API_ENDPOINT: string;
    FEATURE_ROUTES: boolean;
    GOOGLE_MAPS_API_KEY: string;
    SENTRY_DSN: string;
    COMPANY_TYPES_VARIANT: "A" | "B";
  }
}
