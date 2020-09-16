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
  gtmID: string;
  features: {
    routes: boolean;
  };
}

export default Configuration;
