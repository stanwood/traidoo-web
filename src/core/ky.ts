import ky from "ky";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
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
    statusCodes: [408, 429, 502, 503, 504],
  },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            removeAccessToken();
            return;
          }

          if (refreshToken) {
            await refreshTokenRequest(refreshToken)
              .then(({ access }) => {
                request.headers.set("Authorization", `Bearer ${access}`);
                storeAccessToken(access);
                return ky(request);
              })
              .catch(() => {
                removeRefreshToken();
                removeAccessToken();
                location.reload();
              });
          }
        }
      },
    ],
  },
});

export default api;
