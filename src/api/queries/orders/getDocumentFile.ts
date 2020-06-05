import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const getDocumentFileRequest = async (
  orderId: number,
  documentId: number
): Promise<any> => {
  return await api
    .get(`orders/${orderId}/documents/${documentId}/download`, {
      headers: generateHeaders(),
    })
    .json();
};

export default getDocumentFileRequest;
