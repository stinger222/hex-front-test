import { configureStore } from '@reduxjs/toolkit'
import LinkReducer from "./linkSlice"
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    link: LinkReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
