import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Grid } from '@mui/material';

const PaymentConfirm = ({ open, handleClose, handleConfirmPayment }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">
      {"Te pedimos los datos de tu tarjeta de crédito"}
    </DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField autoFocus margin="dense" id="cardNumber" label="Número de tarjeta" type="text" fullWidth />
          </Grid>
          <Grid item xs={8}>
            <TextField margin="dense" id="expiration" label="Vencimiento" type="text" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField  margin="dense"  id="securityCode" label="Código de seguridad" type="text" fullWidth />
          </Grid>
        </Grid>
    </DialogContent>
    <DialogActions>
      <Button style={{ marginRight: '20px' }} onClick={handleClose} >CANCELAR</Button>
      <Button style={{ marginRight: '20px' }} onClick={handleConfirmPayment} color='secondary' autoFocus> PAGAR </Button>
    </DialogActions>
  </Dialog>
);

export default PaymentConfirm