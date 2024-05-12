import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllCenters = createAsyncThunk(
  'invoice/getAllCenters',
  async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get(
        '/invoices/all', { headers: { Authorization: access_token } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const centerSlice = createSlice({
  name: 'center',
  initialState: {
    centers: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
      builder.addCase(getAllCenters.fulfilled, (state, action) => {
        if (!action.payload.success) return
        state.centers = action.payload.response || null;
      })
  }
});

export const {  } = centerSlice.actions
export default centerSlice.reducer