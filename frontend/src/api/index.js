import axios from "axios";
import { STORE_KEY } from "../constants/constants";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  const store = localStorage.getItem(STORE_KEY);
  if (store) {
    const token = JSON.parse(store)?.user?.token
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);

export const createToss = (formData) => API.post("/api/toss/create", formData);
export const getTosses = () => API.get("/api/toss/history");
export const buyTokens = () => API.post("/api/tokens/buy");
