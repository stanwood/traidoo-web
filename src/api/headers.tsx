import Config from "../config";
import { getAccessToken } from "./jwt";

export const generateHeaders = (
  addAccessToken = true,
  isFormData = false
): { [key: string]: string } => {
  // TODO: use new Headers()?
  const headers: { [key: string]: string } = {
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
