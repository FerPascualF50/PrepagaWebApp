import React from 'react';
import InvoiceIcon from '@mui/icons-material/Receipt';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Box, } from '@mui/material';

const Invoices = ({ data }) => {
  const handleInvoiceClick = (year, month) => {
    console.log(`Generar factura para ${year}-${month}`);
  };
  const mockData = {
    year: 2024,
    month: [12, 11, 10, 9, 8, 7, 6, 5]
  };

  return (
    <Box px={3} py={1}>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, paddingTop: '10px' }}>
        Periodos disponibles a facturar
      </Typography>
      <TableContainer>
      <Box >
        <Table sx={{ minWidth: '100%', maxWidth: '100%', mx:"auto", textAlign:"center" }} >
          <TableHead sx={{ fontWeight:'bold' }}>
            <TableRow >
              <TableCell sx={{ fontWeight:'bold' }}>Año</TableCell>
              <TableCell sx={{ fontWeight:'bold' }}>Mes</TableCell>
              <TableCell sx={{ textAlign: 'center', mb: 2, paddingTop: '10px', fontWeight:'bold' }}>Acción</TableCell>
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