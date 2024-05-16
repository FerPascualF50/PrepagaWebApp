import React, { useState, useEffect } from 'react';
import InvoiceIcon from '@mui/icons-material/Receipt';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/Loading.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsByInvocePeriod, postInvoices } from '../store/invoiceSlice';

const Invoices = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { year, months } = useSelector((state) => state.invoice);

  const handleGetClientsAndIds = async (year, month) => {
    setLoading(true);
    const period = { yearInvoice: year, monthInvoice: month };
    const actionResult = await dispatch(getClientsByInvocePeriod(period));
    if (!actionResult.payload.success) return toast.error('No existen clientes pendientes de facturar en el período seleccionado');
    const ids = actionResult.payload.response.map(client => client._id);
    setLoading(false);
    handleCreateInvoice(year, month, ids);
  };

  const handleCreateInvoice = async (year, month, ids) => {
    setLoading(true);
    const payload = { year, month, ids };
    const actionResult = await dispatch(postInvoices(payload));
    setLoading(false);
    if(actionResult.payload=== undefined) return toast.error('No existen clientes pendientes de facturar en el periodo deseado')
    // if (!actionResult.payload.success) toast.success('Facturas creadas con exito')
    return toast.success('Facturas creadas con exito')
  };

  return (
    <Box px={3} py={1}>
      {loading && (<Loading />)}
      <Toaster position="bottom-center" reverseOrder={false} />
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, paddingTop: '10px' }}>
        Periodos disponibles a facturar
      </Typography>
      <TableContainer>
        <Box>
          <Table sx={{ minWidth: '100%', maxWidth: '100%', mx: "auto", textAlign: "center" }}>
            <TableHead sx={{ fontWeight: 'bold' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Año</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Mes</TableCell>
                <TableCell sx={{ textAlign: 'center', mb: 2, paddingTop: '10px', fontWeight: 'bold' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {months?.map((month) => (
                <TableRow key={`${year}-${month}`}>
                  <TableCell>{year}</TableCell>
                  <TableCell>{month}</TableCell>
                  <TableCell sx={{ textAlign: 'center', mb: 2, paddingTop: '10px' }}>
                    <Button variant="outlined" color="secondary" startIcon={<InvoiceIcon />} onClick={() => handleGetClientsAndIds(year, month)} > Facturar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Invoices;