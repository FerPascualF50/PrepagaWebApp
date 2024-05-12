import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllPlans = createAsyncThunk(
  'invoice/getAllPlans',
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

const planSlice = createSlice({
  name: 'plan',
  initialState: {
    plans: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
      builder.addCase(getAllPlans.fulfilled, (state, action) => {
        if (!action.payload.success) return
        state.plans = action.payload.response || null;
      })
  }
});

export const {  } = planSlice.actions
export default planSlice.reducer