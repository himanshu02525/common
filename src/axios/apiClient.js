// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8087",
});

// Add interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwttoken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    alert("JWT NOT FONT")
  }

  return config;
});

export default apiClient;
