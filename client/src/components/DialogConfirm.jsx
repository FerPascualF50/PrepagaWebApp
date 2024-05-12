import * as React from 'react';
import {Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText}  from '@mui/material';

const AlertDialog = ({ open, handleClose, handleConfirmDelete }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">
      {"¿Estás seguro de eliminar?"}
    </DialogTitle>
    <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si presionas en el boton eliminar, la información se perderá para siempre.
          </DialogContentText>
        </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} >Cancelar</Button>
      <Button onClick={handleConfirmDelete} color='secondary' autoFocus>
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog


