import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const deleteRouteRequest = async ({ id }: { id: number }): Promise<void> => {
  await api.delete(`routes/${id}`, {
    headers: generateHeaders(true),
  });
};

export default deleteRouteRequest;
