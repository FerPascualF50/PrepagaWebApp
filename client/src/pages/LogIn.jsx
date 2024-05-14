// import * as React from 'react';
import { useState } from 'react'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { signInAsync } from '../store/authSlice.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { isEmail, hasPassFormat } from "../utils/validation.js";
import { validateUserAsync } from '../store/authSlice.js'
import Loading from '../components/Loading.jsx';

const initialState = {
  userName: '',
  password: ''
}

const Login = () => {
  const [newUser, setNewUser] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const userId = pathname.split('/login/')[1];
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get("userName");
  const access_token = localStorage.getItem('access_token')

  useEffect(() => {
    const fetchData = async () => {
      if (access_token) return;
      if (!userId || !userName) return;
      setLoading(true)
      const success = await dispatch(validateUserAsync({ userId: userId, userName: userName }));
      if (!success.payload.success) return toast.error(`${success.payload.error}`);
      setLoading(false)
      return toast.success(`${success.payload.message}`)
    };
    fetchData();
  }, []);

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
    if (!isEmail(newUser.userName)) return toast.error('ingresa un email válido')
    if (!hasPassFormat(newUser.password)) return toast.error('La contraseña debe tener al menos 8 caracteres y al menos un número')
    setLoading(true)
    const success = await dispatch(signInAsync(newUser));
    setLoading(false)
    if (!success.payload.success) return toast.error(`${success.payload.error}.`);
  }
  const { user } = useSelector((state) => state.auth)
  const isLoggedIn = localStorage.getItem('access_token')

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true)
      user?.rol === 'admin' ? navigate('/dashboard-admin/users', { replace: true }) : navigate('/dashboard-user/manage', { replace: true })
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      {loading && (<Loading />)}
      <Toaster position="bottom-center" reverseOrder={false} />
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /> </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'grey' }}>
          Inicia Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="email" label="e-mail" name="userName" autoComplete="email" autoFocus onChange={handleInput} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handleInput} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: '#fff' }}>Ingresar</Button>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            <Grid item xs>
              <Link to="/forget-pass" variant="body2"> Olvidaste tu clave? </Link>
            </Grid >
          </Grid>
            <Button>
              <Grid item > <Link to="/signup" variant="body2" sx={{ cursor: 'pointer'}}> {"No tenes cuenta aún? Registrate aqui"}</Link> </Grid>
            </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login