import { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Loading from './Loading';
import toast, { Toaster } from 'react-hot-toast';
import AlertDialog from './DialogConfirm';
import { deleteMyUser } from '../store/authSlice';
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom';
import { forcedLogin, validateLogin } from '../store/authSlice'

const Manage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const access_token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!access_token) return
    dispatch(validateLogin())
  }, [])

  const user = useSelector(state => state.auth)

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await dispatch(deleteMyUser(selectedUserId));
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
      <Box sx={{ textAlign: 'left', mb: 2, mt: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="h6" color="grey" sx={{ display: 'inline-block', marginRight: '10px' }}>Plan:</Typography>
        <Typography variant="h6" color="secondary" sx={{ display: 'inline-block', minWidth: '140px', mr: '0' }}>
          {user?.user.plan?.name ? user.user.plan?.name : 'Aún sin Plan'}
        </Typography>        <Button
          variant="outlined"
          color="secondary"
          startIcon={<UpgradeIcon />}
          sx={{ height: '56px', minWidth: '100px', marginTop: '16px', marginLeft: '3%' }}
          onClick={() => navigate('/dashboard-user/profile')}
        >
          Cambiar
        </Button>
      </Box>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'left', mb: 2, mt: 6 }}>
        <Typography variant="h6" sx={{ paddingBottom: '10px', paddingTop: '10px', minWidth: '180px', color: 'grey' }}> Baja de usuario </Typography>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<HighlightOffIcon />}
          sx={{ height: '56px', minWidth: '110px', marginLeft: '10px' }}
          onClick={() => handleDelete(user._id)}
        >
          Solicitar
        </Button>
      </div>
    </Box>
  );
};

export default Manage;