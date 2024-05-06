import * as React from 'react';
import { useState } from 'react'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { signInAsync } from '../store/authSlice'
import { Navigate } from 'react-router-dom';

const initialState = {
  userName: '',
  password: ''
}

const SignIn = () => {
  const [newUser, setNewUser] = useState(initialState)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleInput = (e) => {
    const value = e.target.value
    const name = e.target.name
    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(signInAsync(newUser));
    if (success) {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
    {user && <Navigate to="/dashboard_user" />}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicia Sesion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="e-mail"
            name="userName"
            autoComplete="email"
            autoFocus
            onChange={handleInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInput}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: '#fff' }}>Ingresar</Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"> Olvidaste tu clave? </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2"> {"No tenes cuenta aún? Registrate aqui"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default SignIn