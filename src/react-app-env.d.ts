/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CLIENT_ID: string;
    REACT_APP_CLIENT_NAME: string;
    REACT_APP_THEME_PALETTE_PRIMARY_COLOR: string;
    REACT_APP_THEME_PALETTE_SECONDARY_COLOR: string;
    REACT_APP_API_ENDPOINT: string;
  }
}
