import bcrypt from "bcryptjs"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IAuthSliceState, ILoginResponse } from "../types/store"
import { BCRYPT_SALT, LS_TOKEN_KEY } from "../constants/strings"
import { ILoginFormData, IRegisterFormData } from "../types/forms"
import { api } from "../api"

const initialState: IAuthSliceState = {
  isAuthorized: !!localStorage.getItem(LS_TOKEN_KEY)
}

export const register = createAsyncThunk(
	"auth/register",
	async (data: IRegisterFormData, thunkAPI) => {
		try {
      await api
        .post<{username: string}>("api/register", undefined, {
          params: {
            username: data.username,
            password: bcrypt.hashSync(data.password, BCRYPT_SALT)
          }
        })

		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const authorize = createAsyncThunk(
	"auth/authorize",
	async (data: ILoginFormData, thunkAPI) => {
		try {
      const response = await api.post<ILoginResponse>("api/login", {
        username: data.username,
        password: bcrypt.hashSync(data.password, BCRYPT_SALT)
      } as ILoginFormData)

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
  },
  extraReducers(builder) {
    builder.addCase(register.fulfilled, () => {
      console.log("User registered, redirecting to the login page...")
      location.hash = "#/login"
    }),
    builder.addCase(authorize.fulfilled, () => {
      console.log("User authorized, redirecting to the main page...")
      location.hash = "#/"
    })
  }
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer