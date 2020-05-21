import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const claimJobRequest = async ({ jobId }: { jobId: number }) => {
  return await api
    .post(`jobs/${jobId}/claim`, {
      headers: generateHeaders(),
    })
    .json();
};
