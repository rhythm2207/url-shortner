import axios from "axios";
import { handleRefreshToken } from "./authServices";

axios.defaults.baseURL = "https://url-shortner-orpin.vercel.app/api";

axios.interceptors.request.use(
  function (config) {
    config.headers["authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    config.headers["refresh_token"] =
      localStorage.getItem("refreshToken") || "";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
  
    console.log("success status request", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("refresh-token")
    ) {
      
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await handleRefreshToken();

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
