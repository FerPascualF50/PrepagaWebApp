import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Container, CssBaseline, Grid, OutlinedInput } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/Loading';
import { getPlans, setSelectedPlan } from '../store/planSlice';

// import { authSlice } from '../redux/actions/userActions';

const UserForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    dispatch(getPlans()).unwrap().finally(() => setLoading(false))
  }, [dispatch]);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    taxId: '',
    plan: '',
  });

  const user = useSelector(state => state.user);
  const { plans, selectedPlan } = useSelector(state => state.plan)

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        taxId: user.cuil || '',
        plan: user.plan || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(authSlice(userData));
  };


  const handleChangePlan = (e) => {
    dispatch(setSelectedPlan(e.target.value));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Toaster position="bottom-center" reverseOrder={false} />
      <CssBaseline />
      {loading && <Loading />}
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Typography component="h1" variant="h5" sx={{ color: 'grey' }}>
          Actualiza tus datos
        </Typography>
        <Box component="form" noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" required fullWidth autoFocus
                name="firstName"
                id="firstName"
                label="Tu primer nombre"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth
                id="lastName"
                label="Tu apellido"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                id="cellphone"
                label="Tu celu"
                name="cellphone"
                autoComplete="cellphone"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                name="address"
                label="Todos los datos de tu dirección"
                type="text"
                id="address"
                autoComplete="address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                name="taxId"
                label="Tu CUIL"
                type="number"
                id="taxId"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select required fullWidth value={selectedPlan} onChange={handleChangePlan} displayEmpty input={<OutlinedInput />}>
                <MenuItem value="" disabled > Seleccione un Plan </MenuItem>
                {plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
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

