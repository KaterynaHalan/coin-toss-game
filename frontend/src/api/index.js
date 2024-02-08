import axios from "axios";
import {STORE_KEY} from "../constants/constants";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem(STORE_KEY)) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(STORE_KEY)).token
      }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);