import axios from "axios";
import { LS_TOKEN_KEY } from "../constants/localStorage";

export const api = axios.create({
  baseURL: "https://front-test.hex.team",
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(LS_TOKEN_KEY) || null

  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
})
