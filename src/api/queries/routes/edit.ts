import axios from "../../../core/axios";
import { EditRouteAPIRequest, Route } from "../../../core/interfaces/routes";

const editRouteRequest = async ({
  id,
  data: { frequency, origin, destination, waypoints },
}: EditRouteAPIRequest): Promise<Route> => {
  const response = await axios.patch(`routes/${id}`, {
    frequency,
    origin,
    destination,
    waypoints: waypoints ? waypoints.filter((waypoint) => waypoint) : [],
  });

  return response.data;
};

export default editRouteRequest;
