import axios from "../../../core/axios";

const getDocumentFileRequest = async (
  documentId: number
): Promise<{ url: string; filename: string }> => {
  const response = await axios.get(`documents/${documentId}/download`);

  return response.data;
};

export default getDocumentFileRequest;
