import axios from "axios"
import { LS_TOKEN_KEY } from "../constants/strings"

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(LS_TOKEN_KEY) || null

  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
})

api.interceptors.response.use((config) => {
  if (config.status === 401) {
    console.log("Backend responded with 401 (Unauthorized)")
    console.log("Redirecting to the login page...")

    localStorage.removeItem(LS_TOKEN_KEY)
    location.hash ="#/login"
  }

  return config
})
