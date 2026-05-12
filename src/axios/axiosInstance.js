import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8087",
});

// Add interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwttoken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    alert("JWT NOT FONT")
  }

  return config;
});

export default axiosInstance;
