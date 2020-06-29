import { EditRouteAPIRequest, Route } from "../../../core/interfaces/routes";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const editRouteRequest = async ({
  id,
  data: { frequency, origin, destination, waypoints },
}: EditRouteAPIRequest): Promise<Route> => {
  return await api
    .patch(`routes/${id}`, {
      json: {
        frequency,
        origin,
        destination,
        waypoints: waypoints ? waypoints.filter((waypoint) => waypoint) : [],
      },
      headers: generateHeaders(true),
    })
    .json();
};

export default editRouteRequest;
