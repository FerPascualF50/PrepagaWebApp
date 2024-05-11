import React from 'react';
import { useState } from 'react'
import { Typography, TextField, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleSharp from '@mui/icons-material/AddCircleSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Loading from '../components/Loading';

const Users = () => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // Datos de ejemplo
  const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', plan: 'Premium' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', plan: 'Basic' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (sortBy) {
      const comparison = a[sortBy].localeCompare(b[sortBy]);
      return sortOrder === 'asc' ? comparison : -comparison;
    } else {
      return 0;
    }
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box px={3} py={1}>
      {loading && (<Loading />)}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
          Administrar Usuarios
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, height: '56px' }}>
          <Button variant="outlined" color="secondary" startIcon={<AddCircleSharp />} onClick={() => handleInvoiceClick()}> Crear </Button>
          <TextField label="Buscar" variant="outlined" value={searchTerm} onChange={handleSearchChange} sx={{ mx: 2, height: '100%' }} />
          <Box />
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: '100%', maxWidth: '100%', mx: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '150px' }} onClick={() => handleSort('firstName')}>
                Nombre {sortBy === 'firstName' && (sortOrder === 'asc' ? <ArrowDropDownIcon color="primary"/> : <ArrowDropUpIcon color="primary" />)}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '150px' }} onClick={() => handleSort('lastName')}>
                Apellido {sortBy === 'lastName' && (sortOrder === 'asc' ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />)}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, paddingTop: '10px' }} >Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Plan</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Editar</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.plan}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <DeleteIcon />
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

export default Users;
