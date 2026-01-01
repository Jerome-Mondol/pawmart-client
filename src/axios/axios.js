import axios from 'axios';


// const url = "https://pawmart-server.onrender.com"
const url = "http://localhost:5000"

export const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
})

export const secureAxios = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

secureAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});