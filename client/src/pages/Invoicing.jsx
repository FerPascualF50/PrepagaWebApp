import React from 'react';
import InvoiceIcon from '@mui/icons-material/Receipt';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Box, } from '@mui/material';
import Loading from '../components/Loading.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { getClientsByInvocePeriod } from '../store/invoiceSlice';

const Invoices = () => {
  // console.log('DATA COMPONENT',data)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const handleInvoiceCreation = () => {
    // Lógica para crear la factura con los datos obtenidos de 'clients'
  };

  const mockData = {
    year: 2024,
    month: [12, 11, 10, 9, 8, 7, 6, 5]
  };

  const {users} = useSelector((state) => state.invoice);
  const handleInvoiceClick = async (year, month) => {
    const period = { year, month };
    console.log('period',period)
    setLoading(true);
    try {
      const response = await dispatch(getClientsByInvocePeriod(period));
      console.log('Response:', response); // Verifica la respuesta aquí
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Box px={3} py={1}>
      {loading && (<Loading />)}
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, paddingTop: '10px' }}>
        Periodos disponibles a facturar
      </Typography>
      <TableContainer>
        <Box >
          <Table sx={{ minWidth: '100%', maxWidth: '100%', mx: "auto", textAlign: "center" }} >
            <TableHead sx={{ fontWeight: 'bold' }}>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }}>Año</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Mes</TableCell>
                <TableCell sx={{ textAlign: 'center', mb: 2, paddingTop: '10px', fontWeight: 'bold' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.month.map((month) => (
                <TableRow key={`${mockData.year}-${month}`}>
                  <TableCell>{mockData.year}</TableCell>
                  <TableCell>{month}</TableCell>
                  <TableCell sx={{ textAlign: 'center', mb: 2, paddingTop: '10px' }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<InvoiceIcon />}
                      onClick={() => handleInvoiceClick(mockData.year, month)}
                    >
                      Facturar
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