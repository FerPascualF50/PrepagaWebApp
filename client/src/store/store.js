import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import invoiceSlice from './invoiceSlice'

export const store = configureStore({
   reducer: { auth: authReducer, invoice: invoiceSlice }
})