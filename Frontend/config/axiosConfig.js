import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/", 
});

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers["token"] = `Bearer ${token}`;
} else {
  api.defaults.headers.token = null;
}

console.log("\n\n yes AXIOS api got updated");

export default api;
