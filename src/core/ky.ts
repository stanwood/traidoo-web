import ky from "ky";
import {
  getRefreshToken,
  needRefreshToken,
  storeAccessToken,
} from "../api/jwt";
import { refreshTokenRequest } from "../api/queries/users/token";
import Config from "../config";

const api = ky.create({
  prefixUrl: Config.apiEndpoint,
  timeout: 60000, // 60s, GAE timeout
  retry: {
    limit: 1,
    methods: ["get", "post", "patch", "put", "delete"],
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        if (needRefreshToken()) {
          const refreshToken = getRefreshToken();

          if (refreshToken) {
            const { access } = await refreshTokenRequest(refreshToken);
            request.headers.set("Authorization", `Bearer ${access}`);
            storeAccessToken(access);
          }
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // TODO: move to beforeRetry
        if (response.status === 401) {
          // TODO: redirect to / if token does not exist
          const refreshToken = getRefreshToken();

          if (refreshToken) {
            const { access } = await refreshTokenRequest(refreshToken);
            // TODO: redirect to / on error
            request.headers.set("Authorization", `Bearer ${access}`);
            storeAccessToken(access);

            return ky(request);
          }
        }
      },
    ],
  },
});

export default api;
