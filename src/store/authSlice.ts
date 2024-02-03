import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../types/store";
import { LS_TOKEN_KEY } from "../constants/localStorage";
import { ILoginFormData } from "../types/forms";
import { api } from "../api";


const initialState: IAuthState = {
  isAuthorized: !!localStorage.getItem(LS_TOKEN_KEY)
}

export const authorize = createAsyncThunk(
	"auth/authorize",
	async (data: ILoginFormData, thunkAPI) => {
		try {
      console.log("authorize thunk is called")
      console.log("paassed data: ", data)
      const response = await api.post<{access_token: string}>("api/login", data)

      localStorage.setItem(LS_TOKEN_KEY, response.data.access_token)
      thunkAPI.dispatch(logIn())
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAuthorized = true
    },
    logOut: (state) => {
      localStorage.removeItem(LS_TOKEN_KEY)
      state.isAuthorized = false
    }
  }
})

export const { logIn } = authSlice.actions

export default authSlice.reducer