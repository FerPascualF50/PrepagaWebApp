import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Loading from './Loading';
import toast, { Toaster } from 'react-hot-toast';
import AlertDialog from './DialogConfirm';
import { deleteUsers } from '../store/userSlice';
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom';


const Manage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector(state => state.auth)
  console.log('ESTO VIENDE AUHT', user)

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await dispatch(deleteUsers(selectedUserId));
    setIsDialogOpen(false);
    if (!response.payload.success) return toast.error(`No se puede eliminar.\n${response.payload.error}`)
    localStorage.removeItem('access_token')
    toast.success(`Tu usuario:\n${response.payload.response.firstName} ${response.payload.response.lastName}\n fue eliminado con éxito`)


    setLoading(true);
    setTimeout(async () => {
      await dispatch(logout());
      navigate('/');
      setLoading(false);
    }, 1500)
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box px={3} py={1}>
      {loading && <Loading />}
      <Toaster />
      <AlertDialog open={isDialogOpen} handleClose={handleCloseDialog} handleConfirmDelete={handleConfirmDelete} />
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ paddingBottom: '10px', paddingTop: '10px' }}> Baja de usuario </Typography>
        <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', m: 2, height: '56px' }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<HighlightOffIcon />}
            sx={{ height: '56px', minWidth: '100px' }}
            onClick={() => handleDelete(user._id)}
          >
            Solicitar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Manage;