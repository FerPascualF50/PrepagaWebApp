// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config();
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signInAsync = createAsyncThunk(
  'auth/signInAsync',
  async (credentials) => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/auths/login',
        credentials
      )
      console.log('DATA', data)
      return data
      
    } catch (error) {
      throw error.message
    }
  }
)
  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null
    },
    reducers: {
      logout: (state) => {
        state.user = null
      }
    },
    extraReducers: (builder) => {
      builder.addCase(signInAsync.fulfilled, (state, action) => {
        state.user = action.payload.access_token
        console.log(state.user)
        
      })
    }
  })
  
  export const { login, logout } = authSlice.actions
  export default authSlice.reducer