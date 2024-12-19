import axios from "axios";

const instance = axios.create({
  baseURL: 'https://localhost:8080/api',
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      if(accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

export default instance;
