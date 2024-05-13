import { useState, useEffect } from 'react';
import { Typography, TextField, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllUsers, deleteUsers } from '../store/userSlice';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleSharp from '@mui/icons-material/AddCircleSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Loading from './Loading';
import toast, { Toaster } from 'react-hot-toast';
import AlertDialog from './DialogConfirm';

const Manage = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);

  const users = useSelector(state => state.user.users);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder = sortBy === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortOrder(newSortOrder);
  };

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true)
    const response = await dispatch(deleteUsers(selectedUserId));
    setLoading(false)
    setIsDialogOpen(false);
    if (!response.payload.success) return toast.error(`No se puede eliminar.\n${response.payload.error}`)
      toast.success(`El usuario:\n${response.payload.response.firstName} ${response.payload.response.lastName}\n fué eliminado con éxito`)
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // const filteredUsers = users.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()) ||  user.lastName.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box px={3} py={1}>
      {loading && <Loading />}
      <Toaster />
      <AlertDialog open={isDialogOpen} handleClose={handleCloseDialog} handleConfirmDelete={handleConfirmDelete}/>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ paddingBottom: '10px', paddingTop: '10px' }}> Administrar Usuarios </Typography>
        <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', m: 2, height: '56px' }}>
          <Button variant="outlined" color="secondary" startIcon={<AddCircleSharp />} sx={{ height: '56px', minWidth: '100px' }}> Crear </Button>
          <TextField label="Buscar" variant="outlined" value={search} onChange={handleSearchChange} sx={{ mx: 2, height: '42px', width: '300px' }} />
          <Box />
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: '100%', maxWidth: '100%', mx: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', minWidth: '150px' }} onClick={() => handleSort('firstName')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '4px', cursor: 'pointer' }}>Vencimiento</span>
                  {sortBy === 'firstName' && (sortOrder === 'asc' ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />)}
                </div>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', minWidth: '150px' }} onClick={() => handleSort('lastName')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '4px', cursor: 'pointer' }}>Importe</span>
                  {sortBy === 'lastName' && (sortOrder === 'asc' ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />)}
                </div>
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Saldo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Pagar</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Factura</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.plan?.name ? user.plan.name : "No cliente"}</TableCell>
                <TableCell>
                  <IconButton color="#f3f3f3">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Manage