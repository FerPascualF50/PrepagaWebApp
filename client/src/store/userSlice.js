import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get(
        '/users', { headers: { Authorization: access_token } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const deleteUsers = createAsyncThunk(
  'user/deleteUsers',
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],

  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.response || null;
    }),
      builder.addCase(deleteUsers.fulfilled, (state, action) => {
        if (!action.payload.success) return 
        state.users = state.users.filter(user => user._id !== action.payload.response.id)
      });
  }
});

export const { } = userSlice.actions
export default userSlice.reducer