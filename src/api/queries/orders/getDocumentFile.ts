import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const getDocumentFileRequest = async (orderId: number): Promise<any> => {
  return await api
    .get(`orders/${orderId}/download`, {
      headers: generateHeaders(),
    })
    .json();
};

export default getDocumentFileRequest;
