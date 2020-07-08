import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const getDocumentFileRequest = async (
  documentId: number
): Promise<{ url: string; filename: string }> => {
  return await api
    .get(`documents/${documentId}/download`, {
      headers: generateHeaders(),
    })
    .json();
};

export default getDocumentFileRequest;
