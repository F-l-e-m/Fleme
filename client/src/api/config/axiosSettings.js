import axios from "axios";
import AuthService from "./../../services/AuthService";

const createClient = function (baseURL, headers) {
  const config = {
    baseURL,
    ...headers,
    withCredentials: true,
  };

  const instance = axios.create({ ...config });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  instance.interceptors.response.use((config) => {
    return config;
  }),
    async (error) => {
      const originalRequest = error.config;
      if (
        (error.response.status === 401) & originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true;
        AuthService.refresh()
          .then((response) => {
            localStorage.setItem("token", response.data.accessToken);
            return axios.request(originalRequest);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      throw error;
    };

  return instance;
};

export default createClient;
