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
      return data

    } catch (error) {
      throw error
    }
  }
)

export const validateLogin = createAsyncThunk(
  'auth/validateLogin',
  async () => {
    try {
      const access_token = localStorage.getItem('access_token')
      const response = await axios.get(
        'http://localhost:4000/api/auths/check-token',
        {
          headers: {
            Authorization: access_token
          }
        }
      )
      return response.data.response.firstName
    } catch (error) {
      console.error(error)
    }
  }
)

export const signUpAsync = createAsyncThunk(
  'auth/signUpAsync',
  async (dataUser) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/auths/signup`,
        dataUser
      )
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
      localStorage.removeItem('access_token')
    },
    forcedLogin: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload.userData || null
      if (action.payload.access_token) localStorage.setItem('access_token', action.payload.access_token)
    }),
      builder.addCase(validateLogin.fulfilled, (state, action) => {
        state.user = action.payload
      }),
      builder.addCase(signUpAsync.fulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const { login, logout, forcedLogin } = authSlice.actions
export default authSlice.reducer