import axios from "axios";
import store from "../store";

const BASE_URL = `${import.meta.env.VITE_ROCKETCHAT_URL}/api/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { userId, authToken } = store.getState().auth;

    if (authToken) {
      config.headers["X-User-Id"] = userId;
      config.headers["X-Auth-Token"] = authToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
