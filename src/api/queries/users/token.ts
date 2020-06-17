import ky from "ky";
import Config from "../../../config";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getTokenRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ refresh: string; access: string }> => {
  return await api
    .post("auth/token", {
      json: { email, password },
      headers: generateHeaders(false),
    })
    .json();
};

export const refreshTokenRequest = async (
  refresh: string
): Promise<{ access: string }> => {
  return await ky
    .post("auth/token/refresh", {
      json: { refresh },
      headers: generateHeaders(false),
      prefixUrl: Config.apiEndpoint,
      timeout: 60000,
    })
    .json();
};
