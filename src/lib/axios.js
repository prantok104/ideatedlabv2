import { getAccessToken, parseResponse } from "@/utils/helper";
import axios from "axios";
import useSWR from "swr";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const _axios = axios.create();
_axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

_axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

_axios.interceptors.response.use(
  function (response) {
    return parseResponse(response);
  },
  function (error) {
    return Promise.reject(parseResponse(error));
  }
);

const setHttpConfig = (globalConfig) => {
  _axios.interceptors.request.use(
    (config) => {
      if (globalConfig.baseURL) {
        config.baseURL = globalConfig.baseURL;
      }

      if (globalConfig.headers) {
        config.headers = {
          ...config.headers,
          ...globalConfig.headers,
        };
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};
const axiosFetcher = ([url, options]) =>
  apiClient
    .get(url, options)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });

const _useAxiosSWR = (url, options = {}) => {
  const { data, mutate, error } = useSWR(
    url ? [url, options] : null,
    axiosFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );
  return {
    data,
    mutate,
    isLoading: !Boolean(data?.status),
    error,
  };
};

const apiClient = {
  instance: _axios,
  setHttpConfig,
  httpMethods: HttpMethods,
  get: (url, options = {}) => _axios.get(url, options),
  post: (url, data = {}, options = {}) => _axios.post(url, data, options),
  put: (url, data = {}, options = {}) => _axios.put(url, data, options),
  patch: (url, data = {}, options = {}) => _axios.patch(url, data, options),
  delete: (url, options = {}) => _axios.delete(url, options),
  useAxiosSWR: (url, options = {}) => _useAxiosSWR(url, options),
};

export default apiClient;
