export default interface Configuration {
  debug: boolean;
  environment: string;
  clientId: string;
  clientName: string;
  themePalettePrimaryColor: string;
  themePaletteSecondaryColor: string;
  apiEndpoint: string;
  googleMapsApiKey: string;
  sentryDSN: string;
  features: {
    routes: boolean;
  };
}
