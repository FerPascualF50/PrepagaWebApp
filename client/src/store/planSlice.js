import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPlans = createAsyncThunk(
  'invoice/getAllPlans',
  async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get(
        '/plans/', { headers: { Authorization: access_token } }
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
    plans: [],
    selectedPlan: ''
  },
  reducers: {
    setSelectedPlan(state, action) {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(getPlans.fulfilled, (state, action) => {
        if (!action.payload.success) return
        state.plans = action.payload.response || null;
      })
  }
});

export const {  setSelectedPlan } = planSlice.actions
export default planSlice.reducer