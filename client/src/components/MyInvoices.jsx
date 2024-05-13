import { useState, useEffect } from 'react';
import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { InvoicesByUser, updatePaymentInvoice, getMyPdfInvoice } from '../store/invoiceSlice';
import PaidIcon from '@mui/icons-material/Paid';
import PaymentIcon from '@mui/icons-material/Payment';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Loading from './Loading';
import toast, { Toaster } from 'react-hot-toast';
import PaymentConfirm from '../components/PaymetConfirm';

const MyInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InvoicesByUser());
  }, [dispatch]);

  const { invoices } = useSelector((state) => state.invoice);

  const handlePayment = (_id) => {
    setSelectedInvoiceId(_id);
    setIsDialogOpen(true);
  };

  const handleConfirmPayment = async () => {
    setLoading(true)
    const response = await dispatch(updatePaymentInvoice(selectedInvoiceId));
    setLoading(false)
    if (!response.payload.success) return toast.error(`${response.payload.error}`)
      setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsDialogOpen(false);
      toast.success(`El Pago fue realizado con éxito`)
    }, 3000);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleGetPdfInvoice = async (id) => {
    const response = await dispatch(getMyPdfInvoice(id))
    if(response.payload == undefined) return toast.error('La factura ya no existe')
  };

  return (
    <Box px={3} py={1}>
      {loading && <Loading />}
      <Toaster />
      <PaymentConfirm open={isDialogOpen} handleClose={handleCloseDialog} handleConfirmPayment={handleConfirmPayment} />
      <Box sx={{ textAlign: 'center', mb: 2, paddingBottom: '10px', paddingTop: '10px' }}>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: '100%', maxWidth: '100%', mx: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Vencimiento </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nº </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Periodo </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Importe </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Pagar</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Factura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell sx={{ minWidth: '120px' }}>{invoice.expirationPayment}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{invoice.number}</TableCell>
                <TableCell sx={{ minWidth: '100px' }}>{invoice.period.month} / {invoice.period.year}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>$ {invoice.price}</TableCell>
                <TableCell>
                  {invoice.statusPayment === 'pending' ? (
                    <Tooltip title="Impaga">
                      <PaidIcon color="secondary" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Pagada">
                      <PaidIcon color="primary" />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handlePayment(invoice._id)} disabled={invoice.statusPayment !== 'pending'}>
                    <PaymentIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleGetPdfInvoice(invoice._id)}>
                    <RequestQuoteIcon />
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

export default MyInvoices