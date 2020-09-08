export interface RouteFormFields {
  origin: string;
  destination: string;
  waypoints: { name: string }[];
  frequency: number[];
}
