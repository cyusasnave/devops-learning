import { AxiosRequestConfig } from "axios";

export interface IRequestArgs {
  endpoint: string;
  config?: AxiosRequestConfig;
}
