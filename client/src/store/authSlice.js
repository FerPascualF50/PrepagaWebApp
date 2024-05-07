import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signInAsync = createAsyncThunk(
  'auth/signInAsync',
  async (credentials) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/auths/login`,
        credentials
      )
      localStorage.setItem('access_token', data.access_token)
      return data
      
    } catch (error) {
      throw error
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
        state.user = action.payload.userData
      })
    }
  })
  
  export const { login, logout } = authSlice.actions
  export default authSlice.reducer