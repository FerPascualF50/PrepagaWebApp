import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import invoiceSlice from './invoiceSlice'
import userSlice from './userSlice'
import planSlice from './planSlice'
import centerSlice from './centerSlice'

export const store = configureStore({
   reducer: { 
      auth: authReducer, 
      invoice: invoiceSlice, 
      user: userSlice, 
      plan: planSlice,
      center: centerSlice
   }
})