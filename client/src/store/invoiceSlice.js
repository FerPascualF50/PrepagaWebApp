import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const invoiceAsync = createAsyncThunk(
  'invoice/invoiceAsync',
  async (credentials) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/auths/login`,
        credentials
      )
      return data

    } catch (error) {
      throw error
    }
  }
)

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoice: null
  },
  reducers: {
    logouttert: (state) => {
      state.user = null
      localStorage.removeItem('access_token')
    },
    forcedLoginwtwet: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(signInAsync.fulfilled, (state, action) => {
    //   state.user = action.payload.userData || null
    //   if (action.payload.access_token) localStorage.setItem('access_token', action.payload.access_token)
    // s
     
  }
})

export const { logouttert, logout, forcedLoginwtwet } = invoiceSlice.actions
export default invoiceSlice.reducer