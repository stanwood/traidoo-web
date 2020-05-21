import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const returnJobRequest = async ({ jobId }: { jobId: number }) => {
  return await api
    .delete(`jobs/${jobId}/claim`, {
      headers: generateHeaders(),
    })
    .json();
};
