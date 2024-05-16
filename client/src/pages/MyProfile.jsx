import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, Box, Typography, Container, CssBaseline, Grid, OutlinedInput } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans, setSelectedPlan } from '../store/planSlice';
import { updateUsers } from '../store/userSlice';
import {  validateLogin } from '../store/authSlice'
import toast, { Toaster } from 'react-hot-toast';


const UserForm = () => {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!access_token) return
    dispatch(validateLogin())
  }, [])

  const { user } = useSelector(state => state.auth);

  const [userUpload, setUserUpload] = useState({})

  useEffect(() => {
    dispatch(getPlans());
  }, []);
  const { plans } = useSelector(state => state.plan);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserUpload({
      ...userUpload,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(updateUsers(userUpload));
    if(!response.payload.success) return toast.error(`${response.payload.error}`)
    return toast.success(`${response.payload.message}`)
  };
  
  const handleChangePlan = (e) => {
    dispatch(setSelectedPlan(e.target.value));
    setUserUpload({...userUpload, plan: {_id: e.target.value}})
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toaster  />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Typography component="h1" variant="h5" sx={{ color: 'grey' }}>
          Actualiza tus datos
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" required fullWidth autoFocus
                name="firstName"
                id="firstName"
                label="Tu primer nombre"
                value={userUpload?.firstName || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth
                id="lastName"
                label="Tu apellido"
                name="lastName"
                autoComplete="off"
                value={userUpload?.lastName || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                id="phone"
                label="Tu celu"
                name="cellphone"
                autoComplete="off"
                value={userUpload?.cellphone || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                name="address"
                label="Todos los datos de tu dirección"
                type="text"
                id="address"
                autoComplete="off"
                value={userUpload?.address || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                name="taxId"
                label="Tu CUIL"
                type="number"
                id="taxId"
                autoComplete="off"
                value={userUpload?.taxId || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                value={userUpload?.plan?._id || ''}
                required
                fullWidth
                onChange={handleChangePlan}
                displayEmpty
                input={<OutlinedInput />}
              >
                <MenuItem disabled>Seleccione un Plan</MenuItem>
                {plans?.map((plan) => (
                  <MenuItem key={plan._id} value={plan._id}>{plan.name}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: '#fff' }}>
            Actualizar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserForm;