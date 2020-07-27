import axios from "../../../core/axios";

export const claimJobRequest = async ({ jobId }: { jobId: number }) => {
  const response = await axios.post(`jobs/${jobId}/claim`);
  return response.data;
};
