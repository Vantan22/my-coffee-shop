import axios from "axios";

// Create an Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Request interceptor for adding authentication token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error scenarios
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Forbidden: You do not have permission");
          break;
        case 404:
          console.error("Not Found: The requested resource does not exist");
          break;
        case 500:
          console.error("Server Error: Something went wrong");
          break;
        default:
          console.error("An unexpected error occurred");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received from server");
    } else {
      // Error in setting up the request
      console.error("Error setting up request", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
