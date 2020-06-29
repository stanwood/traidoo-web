export interface Route {
  id: number;
  frequency: number[];
  origin: string;
  destination: string;
  waypoints: string[];
  length: number;
}

export interface RoutesAPIResponse {
  count: number;
  next: number;
  previous: number;
  results: Route[];
}

export interface CreateRouteAPIRequest {
  frequency: number[];
  origin: string;
  destination: string;
  waypoints: string[];
}

export interface EditRouteAPIRequest {
  id: number;
  data: {
    frequency: number[];
    origin: string;
    destination: string;
    waypoints: string[];
  };
}
