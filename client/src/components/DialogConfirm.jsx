import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ open, handleClose, handleConfirmDelete }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">
      {"¿Estás seguro de eliminar el usuario?"}
    </DialogTitle>
    <DialogActions>
      <Button onClick={handleClose} >Cancelar</Button>
      <Button onClick={handleConfirmDelete} color='secondary' autoFocus>
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog


