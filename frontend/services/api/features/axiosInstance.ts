import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {},
});

const requestHandler = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("access_token");
  config.headers = config.headers || {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const responseHandler = (response: AxiosResponse): AxiosResponse => response;

const errorHandler = (error: AxiosError): Promise<never> => {
  return Promise.reject(
    (error.response && error.response.data) || "Something went wrong"
  );
};

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => requestHandler(config),
  (error: AxiosError) => errorHandler(error)
);

API.interceptors.response.use(
  (response: AxiosResponse) => responseHandler(response),
  (error: AxiosError) => errorHandler(error)
);

export default API;
