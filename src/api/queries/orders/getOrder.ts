import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const getOrderRequest = async (key: string, id: number): Promise<any> => {
  return await api.get(`orders/${id}`, { headers: generateHeaders() }).json();
};

export default getOrderRequest;
