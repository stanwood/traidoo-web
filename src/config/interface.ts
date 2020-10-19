interface Configuration {
  debug: boolean;
  environment: string;
  clientId: string;
  clientName: string;
  themePalettePrimaryColor: string;
  themePaletteSecondaryColor: string;
  apiEndpoint: string;
  googleMapsApiKey: string;
  sentryDSN: string;
  gaTrackingID: string;
  sponsorLogo: string | null;
  compantTypesVariant: null | "A" | "B";
  features: {
    routes: boolean;
  };
}

export default Configuration;
