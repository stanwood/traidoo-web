import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, getRefreshToken, storeAccessToken } from "../api/jwt";
import { refreshTokenRequest } from "../api/queries/users/token";
import Config from "../config";
import history from "./history";

const axiosInstance = axios.create({
  baseURL: Config.apiEndpoint,
  timeout: 60000, // 60s, GAE timeout
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }

  request.headers["Region"] = Config.clientId;

  return request;
});

const refreshAuthLogic = async (failedRequest: any): Promise<any> => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    return refreshTokenRequest(refreshToken)
      .then((tokenRefreshResponse) => {
        storeAccessToken(tokenRefreshResponse.data.access);

        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + tokenRefreshResponse.data.access;

        return Promise.resolve();
      })
      .catch(() => {
        delete failedRequest.response.config.headers["Authorization"];
        history.push("/logout");
      });
  } else {
    history.push("/logout");
  }

  return Promise.resolve();
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
});

export default axiosInstance;
