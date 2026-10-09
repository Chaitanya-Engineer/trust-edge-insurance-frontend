import { useRef, useState } from "react";
import axios from "axios";
import store from "../../store/index.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelTokenRef = useRef(null);
 const reduxToken = store.getState()?.auth?.accessToken;
  // ─── Axios Instance ──────────────────────────────────────
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  // ─── Request Interceptor ────────────────────────
  axiosInstance.interceptors.request.use(
    (request) => {
      const token = reduxToken || localStorage.getItem("access_token");
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      request.headers["ngrok-skip-browser-warning"] = "true";
      if (request.data instanceof FormData) {
        delete request.headers["Content-Type"];
      } else if (!request.headers["Content-Type"]) {
        request.headers["Content-Type"] = "application/json";
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  // ─── Response Interceptor ────────────────────────────────
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  // ─── Cancel API Call ─────────────────────────────────────
  const cancelApiCall = (reason = "Request cancelled!") => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel(reason);
    }
  };

  // ─── Fetch Data ──────────────────────────────────────────
  const fetchData = async (additionalParams) => {
    setIsLoading(true);
    setError(null);

    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("New request initiated.");
    }

    cancelTokenRef.current = axios.CancelToken.source();

    const requestBody = {
      ...options?.data,
      ...additionalParams,
    };

    const isGet = options?.method?.toUpperCase() === "GET"
                  || !options?.method;  // default GET

    try {
      const response = await axiosInstance(url, {
        ...options,
        // GET → params (query string)
        // POST/PUT/DELETE → data (body)
        ...(isGet
          ? { params: requestBody }
          : { data: requestBody }),
        cancelToken: cancelTokenRef.current.token,
      });

      setData(response.data);

      if (options?.onSuccess) {
        options.onSuccess(response.data, response.status);
      }

    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled:", err.message);
      } else {
        setError(err);

        if (options?.onFailure) {
          options.onFailure(err);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── callApi ─────────────────────────────────────────────
  const callApi = (additionalParams) => {
    fetchData(additionalParams);
  };

  return { data, isLoading, error, callApi, cancelApiCall };
};