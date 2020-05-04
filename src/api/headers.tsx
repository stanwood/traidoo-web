import Config from "../config";
import { getAccessToken } from "./jwt";

export const generateHeaders = (
  addAccessToken: boolean = true,
  isFormData: boolean = false
) => {
  // TODO: use new Headers()?
  // TODO: support FormData
  let headers: { [key: string]: string } = {
    Region: Config.clientId,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (addAccessToken) {
    const accessToken = getAccessToken();

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return headers;
};
