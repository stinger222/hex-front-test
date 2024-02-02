import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../types/store";

const initialState: IUserState = {
  username: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    temp: (state) => {
      state.username = "temp"
    }
  }
})

export const { temp } = userSlice.actions

export default userSlice.reducer