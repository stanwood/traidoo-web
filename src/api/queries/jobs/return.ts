import axios from "../../../core/axios";

export const returnJobRequest = async ({ jobId }: { jobId: number }) => {
  const response = await axios.delete(`jobs/${jobId}/claim`);
  return response.data;
};
