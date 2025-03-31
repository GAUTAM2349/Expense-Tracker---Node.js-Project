import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3002/", // your API base URL
});

// Check if token is in localStorage and set Authorization header
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers["token"] = `Bearer ${token}`;
} else {
  api.defaults.headers.token = null;
}

export default api;
