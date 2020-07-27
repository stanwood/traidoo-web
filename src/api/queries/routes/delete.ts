import axios from "../../../core/axios";

const deleteRouteRequest = async ({ id }: { id: number }): Promise<void> => {
  await axios.delete(`routes/${id}`);
};

export default deleteRouteRequest;
