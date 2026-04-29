import axios, { AxiosResponse } from "axios";

// Define the base API URL and append "/api" to it
const base = "https://localhost:7264";

const baseURL = `${base}/api`;

console.log("BASE URL:", baseURL);
// Create an Axios instance
const axiosInstance = axios.create({ baseURL });

// add the token to any request 
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log("→", (config.method || "GET").toUpperCase(), `${config.baseURL}${config.url}`);
  return config;
});


// 5) Interceptors handle authentication issues like missing or expired tokens 
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.log("← ERROR", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      console.warn("Received 401 – clearing session");
    //   removeSession();
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
