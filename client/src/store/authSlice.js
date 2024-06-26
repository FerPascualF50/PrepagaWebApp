import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signInAsync = createAsyncThunk(
  'auth/signInAsync',
  async (credentials) => {
    try {
      const { data } = await axios.post(
        `/auths/login`,
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
        '/auths/check-token',
        {
          headers: {
            Authorization: access_token
          }
        }
      )
      return response.data
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
        `/auths/signup`,
        dataUser
      )
      return data
    } catch (error) {
      throw error
    }
  }
)


export const validateUserAsync = createAsyncThunk(
  'auth/validateUserAsync',
  async (userId, userName) => {
    try {
      const { data } = await axios.patch(
        `/auths/validate-email/:userId`,
        userId
      )
      return data
    } catch (error) {
      throw error
    }
  }
)

export const forgetPassAsync = createAsyncThunk(
  'auth/forgetPassAsync',
  async (userName) => {
    try {
      const { data } = await axios.patch(
        `/auths/password`,
        userName
      )
      return data
    } catch (error) {
      throw error
    }
  }
)
export const validateCodePassAsync = createAsyncThunk(
  'auth/validateCodePassAsync',
  async (payload) => {
    try {
      const { data } = await axios.patch(
        `/auths/validate-pass`,
        payload
      )
      return data
    } catch (error) {
      throw error
    }
  }
)

export const deleteMyUser = createAsyncThunk(
  'user/deleteMyUser',
  async (id) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.delete(
        `/users/${id}`, { headers: { Authorization: access_token } }, { params: id }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

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
      state.user = action.payload.userData
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload.userData || null
      if (action.payload.access_token) localStorage.setItem('access_token', action.payload.access_token)
    }),
      builder.addCase(validateLogin.fulfilled, (state, action) => {
        state.user = action.payload.response
      }),
      builder.addCase(signUpAsync.fulfilled, (state, action) => {
        state.user = action.payload
      }),
      builder.addCase(validateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
      }),
      builder.addCase(forgetPassAsync.fulfilled, (state, action) => {
        state.user = action.payload
      }),
      builder.addCase(validateCodePassAsync.fulfilled, (state, action) => {
        state.user = action.payload
      }),
      builder.addCase(deleteMyUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      
  }
})

export const { login, logout, forcedLogin } = authSlice.actions
export default authSlice.reducer