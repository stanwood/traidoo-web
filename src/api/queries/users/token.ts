import axios from "../../../core/axios";

export const getTokenRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ refresh: string; access: string }> => {
  const response = await axios.post(
    "auth/token",
    { email, password },
    { skipAuthRefresh: true }
  );
  return response.data;
};

export const refreshTokenRequest = async (
  refresh: string
): Promise<{ response: Response; data: { access: string } }> => {
  return await axios.post(
    "auth/token/refresh",
    {
      refresh,
    },
    { skipAuthRefresh: true }
  );
};
