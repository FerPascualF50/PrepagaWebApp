import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllCenters = createAsyncThunk(
  'invoice/getAllCenters',
  async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get(
        '/centers',
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
    centers: [],
    provinces: [],
    selectedProvince: ''
  },
  reducers: {
    setCenters(state, action) {
      state.centers = action.payload;
    },
    setProvinces(state, action) {
      state.provinces = action.payload;
    },
    setSelectedProvince(state, action) {
      state.selectedProvince = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCenters.fulfilled, (state, action) => {
      if (!action.payload.success) return
      state.centers = action.payload.response || null;
      const provinces = state.centers.map((center) => center.province)
      state.provinces = provinces.filter((province, index) => {
        return provinces.findIndex((p) => p.id === province.id) === index;
      });
    })
  }
});

export const { setCenters, setProvinces, setSelectedProvince } = centerSlice.actions
export default centerSlice.reducer