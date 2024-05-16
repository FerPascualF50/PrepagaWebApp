import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getClientsByInvocePeriod = createAsyncThunk(
  'invoice/getClientsByInvocePeriod',
  async (period) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const { data } = await axios.get(
        `/invoices/clients?yearInvoice=${period.yearInvoice}&monthInvoice=${period.monthInvoice}`, { headers: { Authorization: access_token } }, {}
      )
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const postInvoices = createAsyncThunk(
  'invoice/postInvoices',
  async (payload) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.post(
        '/invoices', { year: payload.year, month: payload.month, ids: payload.ids }, { headers: { Authorization: access_token } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAllInvoices = createAsyncThunk(
  'invoice/getAllInvoices',
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

export const deleteInvoices = createAsyncThunk(
  'invoice/deleteInvoices',
  async (id) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.patch(
        `/invoices/delete/${id}`, { params: id }, { headers: { Authorization: access_token } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const InvoicesByUser = createAsyncThunk(
  'invoice/InvoicesByUser',
  async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get(
        `/invoices/by_user`, { headers: { Authorization: access_token } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const updatePaymentInvoice = createAsyncThunk(
  'invoice/updatePaymentInvoice',
  async (_id) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.patch(
        `/invoices/payment?_id=${_id}`, {}, { headers: { Authorization: access_token } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getMyPdfInvoice = createAsyncThunk(
  'invoice/getMyInvoice',
  async (id, thunkAPI) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get(`/invoices/pdf/${id}`, {
        responseType: 'blob',
        headers: { Authorization: access_token },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();

    } catch (error) {
      throw error;
    }
  }
);


const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    users: [],
    year: 2024,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    invoices: []
  },
  reducers: {
    setYearAndMonths: (state, action) => {
      state.year = action.payload.year;
      state.months = action.payload.months;
    },
    removeMonth: (state, action) => {
      state.months = state.months.filter(item => item !== action.payload);
    },
    deleteInvoice: (state) => {
      state.users = []
      state.invoices = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getClientsByInvocePeriod.fulfilled, (state, action) => {
      state.users = action.payload || null;
    }),
      builder.addCase(postInvoices.fulfilled, (state, action) => {
        state.users = action.payload || null;
        if (!action.payload.success) return
        state.months = state.months.filter(month => month !== action.payload.response[0].period.month);
      }),
      builder.addCase(getAllInvoices.fulfilled, (state, action) => {
        if (!action.payload.success) return
        state.invoices = action.payload.response || null;
      }),
      builder.addCase(deleteInvoices.fulfilled, (state, action) => {
        if (!action.payload.success) return
        const newInvoices = state.invoices.filter(invoice => invoice._id !== action.payload.response._id);
        state.invoices = newInvoices.length ? newInvoices : null;
      }),
      builder.addCase(InvoicesByUser.fulfilled, (state, action) => {
        if (!action.payload.success) return
        state.invoices = action.payload.response || null;
      }),
      builder.addCase(updatePaymentInvoice.fulfilled, (state, action) => {
        if (!action.payload.success) return
        const updatedInvoice = action.payload.response;
        const index = state.invoices.findIndex(invoice => invoice._id === updatedInvoice._id);
        (index !== -1) ? (state.invoices[index] = { ...updatedInvoice }) : (state.invoices.push({ ...updatedInvoice }))
      })
  }
});

export const { setYearAndMonths, removeMonth, deleteInvoice } = invoiceSlice.actions
export default invoiceSlice.reducer