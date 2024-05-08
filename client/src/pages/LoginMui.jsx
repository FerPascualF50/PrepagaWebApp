import * as React from 'react';
import { useState } from 'react'
import { CircularProgress, Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch } from 'react-redux'
import { signInAsync } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const initialState = {
  userName: '',
  password: ''
}

const SignIn = () => {
  const [newUser, setNewUser] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInput = (e) => {
    const value = e.target.value
    const name = e.target.name
    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*\d).{8,}$/
    if (!emailRegex.test(newUser.userName)) return toast.error('Por favor, ingresa un email válido');
    if (!passwordRegex.test(newUser.password)) return toast.error('La contraseña debe tener al menos 8 caracteres y al menos un número');
    const success = await dispatch(signInAsync(newUser));
    if (!success.payload.success) return toast.error('e-mail y/o contraseña inválidos');
    navigate('/dashboard_user', { replace: true });
  }
  const isLoggedIn = localStorage.getItem('access_token')

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true)
      navigate('/dashboard_user', { replace: true });
    }
  }, [isLoggedIn, navigate]);
  
  return (
    <Container component="main" maxWidth="xs">
      {loading && (
        <CircularProgress />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'grey' }}>
          Inicia Sesión
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
          <Grid container sx={{display: 'flex', flexDirection: 'column', alignItems:'center', padding:'10px'}}>
            <Grid item xs>
              <Link href="/fotget-pass" variant="body2"> Olvidaste tu clave? </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2"> {"No tenes cuenta aún? Registrate aqui"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn