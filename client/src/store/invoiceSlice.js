import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getClientsByInvocePeriod = createAsyncThunk(
  'invoice/getClientsByInvocePeriod',
  async (period) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const { data } = await axios.get(
        `/invoices/clients`,
         period
      )
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    users: null
  },
  reducers: {

    getClients: (state, action) => {
      state.users = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getClientsByInvocePeriod.fulfilled, (state, action) => {
      state.users = action.payload || null
    })

  }
})

export const { getClients } = invoiceSlice.actions
export default invoiceSlice.reducer