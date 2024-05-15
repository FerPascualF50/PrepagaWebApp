import React, { useEffect, useState } from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../components/Loading';
import AlertDialog from '../components/DialogConfirm';
import toast, { Toaster } from 'react-hot-toast';
import { getAllInvoices, deleteInvoices } from '../store/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';

const ShowInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const { invoices } = useSelector((state) => state.invoice);

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true)
    const response = await dispatch(deleteInvoices(selectedUserId));
    setLoading(false)
    setIsDialogOpen(false);
    if (!response.payload.success) return toast.error(`No se puede eliminar.\n${response.payload.error}`)
    toast.success(`La factura Nº ${response.payload.response.number}\n Fue eliminada con éxito`)
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInvoices = invoices?.filter(invoice => {
    const { client } = invoice;
    const fullName = client ? `${client.firstName} ${client.lastName}` : '';
    const searchLower = searchTerm.toLowerCase();
    return fullName.toLowerCase().includes(searchLower) || client.firstName.toLowerCase().includes(searchLower) || client.lastName.toLowerCase().includes(searchLower);
  });

  const getStatusInfo = (status) => {
    return {
      text: status === 'paid' ? 'Pagada' : 'Impaga',
      color: status === 'paid' ? 'grey' : '#ff5862'
    };
  };

  return (
    <Box px={3} py={1}>
      {loading && <Loading />}
      <Toaster />
      <AlertDialog open={isDialogOpen} handleClose={handleCloseDialog} handleConfirmDelete={handleConfirmDelete} />
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, paddingTop: '10px' }}>
        Facturas
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <TextField label="Buscar" value={searchTerm} onChange={handleSearchChange} InputProps={{ endAdornment: <SearchIcon />, }} />
      </Box>
      <TableContainer >
        <Table sx={{ minWidth: '100%', maxWidth: '100%', mx: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mes</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Factura Nº</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Pago</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell>{invoice.client?.firstName}</TableCell>
                <TableCell>{invoice.client?.lastName}</TableCell>
                <TableCell>{invoice.period?.year}</TableCell>
                <TableCell>{invoice.period?.month}</TableCell>
                <TableCell>{invoice?.number}</TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: getStatusInfo(invoice.statusPayment).color }}>
                    {getStatusInfo(invoice.statusPayment).text}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(invoice._id)}>
                    <DeleteIcon color='secondary' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShowInvoices;