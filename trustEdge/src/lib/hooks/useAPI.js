import { useCallback, useRef, useState } from "react";
import axios from "axios";
import store from "../../store/index.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelTokenRef = useRef(null);

  const getToken = () =>
    store.getState()?.auth?.accessToken ||
    localStorage.getItem("access_token");

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["ngrok-skip-browser-warning"] = "true";

    // Let the browser/Axios set the multipart boundary.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }

      return Promise.reject(err);
    }
  );

  const cancelApiCall = (reason = "Request cancelled!") => {
    cancelTokenRef.current?.cancel(reason);
  };

  // Shared request handler for JSON and FormData.
  const request = async (
    params = {},
    customUrl,
    { useCancelToken = false } = {}
  ) => {
    const method = (options.method || "GET").toUpperCase();

    const isFormData = params instanceof FormData;
    const body = isFormData
      ? params
      : {
          ...(options.data || {}),
          ...(params || {}),
        };

    const config = {
      ...options,
      url: customUrl || url,
      method,
    };

    // Avoid leaking custom hook options into Axios config.
    delete config.onSuccess;
    delete config.onFailure;
    delete config.data;

    if (useCancelToken) {
      cancelTokenRef.current?.cancel("New request initiated.");
      cancelTokenRef.current = axios.CancelToken.source();
      config.cancelToken = cancelTokenRef.current.token;
    }

    if (method === "GET") {
      config.params = isFormData ? undefined : body;
    } else {
      config.data = body;
    }

    return axiosInstance.request(config);
  };

  const fetchData = useCallback(
    async (additionalParams = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await request(additionalParams, url, {
          useCancelToken: true,
        });

        setData(response.data);
        options.onSuccess?.(response.data, response.status);

        return response.data;
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
          return undefined;
        }

        setError(err);
        options.onFailure?.(err);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, options]
  );

  // Use for file uploads and dynamic URLs.
  // Pass FormData directly; never spread it into an object.
  const callApiRaw = async (payload, customUrl) => {
    const response = await request(payload, customUrl);
    return response.data;
  };

  const callApi = (additionalParams = {}) =>
    fetchData(additionalParams);

  return {
    data,
    isLoading,
    error,
    callApi,
    callApiRaw,
    cancelApiCall,
  };
};