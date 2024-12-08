import { AxiosRequestConfig } from "axios";
import API from "./axiosInstance";

class APIClient<DataType, RequestType = void> {
  constructor(public readonly endpoint: string) {}

  fetch = (config?: AxiosRequestConfig) =>
    API.get<DataType>(this.endpoint, config).then((res) => res.data);

  post = (data: RequestType, config?: AxiosRequestConfig) =>
    API.post<DataType>(this.endpoint, data, config).then((res) => res.data);

  patch = (data: RequestType, config?: AxiosRequestConfig) =>
    API.patch<DataType>(this.endpoint, data, config).then((res) => res.data);

  put = (data: RequestType, config?: AxiosRequestConfig) =>
    API.put<DataType>(this.endpoint, data, config).then((res) => res.data);

  delete = (config?: AxiosRequestConfig) =>
    API.delete<DataType>(this.endpoint, config).then((res) => res.data);
}

export default APIClient;
