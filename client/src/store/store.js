import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import invoiceSlice from './invoiceSlice'
import userSlice from './userSlice'

export const store = configureStore({
   reducer: { auth: authReducer, invoice: invoiceSlice, user: userSlice }
})