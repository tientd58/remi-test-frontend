import axios from "axios";

import TokenService from "./tokenServices";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      const status = err.response.status;
      if (status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          TokenService.updateLocalAccessToken(rs.data.accessToken);

          return instance(originalConfig);
        } catch (_error: any) {
          if (_error && _error.response.status === 403) {
            TokenService.removeUser();
            window.location.reload();
          }
          return Promise.reject(_error);
        }
      }
      if (status === 403) {
        TokenService.removeUser();
        window.location.reload();
      }
    }

    return Promise.reject(err);
  }
);

export default instance;