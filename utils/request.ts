import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { API_URL } from "../config";

let api: AxiosInstance;
let errorHandler: Function | null = (error: any) => {
  console.log(error);
};

export const isInitalized = () => {
  return typeof api !== "undefined";
};

export const apiInitialize = () => {
  if (isInitalized()) {
    return "Already Initialized";
  }
  api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { Accept: "application/json" },
  });
  // Add a response interceptor
  api.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      errorHandler!(error);
      return error;
    }
  );
};

export const onAPIError = (handleError: any) => {
  errorHandler = handleError;
  return () => (errorHandler = null);
};

const setAuthHeader = async (jwt: any) => {
  return jwt ? { Authorization: `Bearer ${jwt}` } : null;
};

export const get = async <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
  jwt: string | null = null
): Promise<R> => {
  const header: object | null = await setAuthHeader(jwt);
  return api.get(url, { headers: header, ...config });
};

export const remove = async <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
  jwt: string | null = null
): Promise<R> => {
  const header: object | null = await setAuthHeader(jwt);
  return api.delete(url, { headers: header, ...config });
};

export const patch = async <T = any, R = AxiosResponse<T>>(
  url: string,
  body: any,
  config?: AxiosRequestConfig,
  jwt: string | null = null
): Promise<R> => {
  const header: object | null = await setAuthHeader(jwt);
  return api.patch(url, body, { headers: header, ...config });
};

export const post = async <T = any, R = AxiosResponse<T>>(
  url: string,
  body: any,
  config?: AxiosRequestConfig,
  jwt: string | null = null
): Promise<R> => {
  const header: object | null = await setAuthHeader(jwt);
  return api.post(url, body, {
    ...config,
    headers: {
      ...header,
      ...(config ? config.headers : {}),
    },
  });
};

export const del = async <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
  jwt: string | null = null
): Promise<R> => {
  const header: object | null = await setAuthHeader(jwt);
  return api.delete(url, { ...config, headers: { ...header, ...(config ? config.headers : {}) } });
};

export const put = async <T = any, R = AxiosResponse<T>>(
  url: string,
  body: any,
  config?: AxiosRequestConfig,
  jwt: string | null = null
): Promise<R> => {
  const header: object | null = await setAuthHeader(jwt);
  return api.put(url, body, { headers: header, ...config });
};
