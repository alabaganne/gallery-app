import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", //your api URL
});

export default api;
