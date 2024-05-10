import * as React from 'react';
import { useState } from 'react'
import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { isEmail } from "../utils/validation.js";
import { forgetPassAsync } from '../store/authSlice.js'
import Loading from '../components/Loading.jsx';


const ForgetPass = () => {
  const [newUser, setNewUser] = useState()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoggedIn = localStorage.getItem('access_token')

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard_user', { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
      setLoading(true)
    const success = await dispatch(forgetPassAsync(newUser));
    success.payload.success
    ? (
      setLoading(true),
      setTimeout(() => {
        toast.success('Copia el código enviado a tu e-mail\ny volve para escribirlo...', {
          position: "top-center", duration: 5000
        });
      }, 50),
      setLoading(false),
      navigate(`/input-code/${newUser.userName}`, { replace: true })
    )
    : (toast.error(`${success.payload.error}`))
  }
  
  return (
    <Container component="main" maxWidth="xs">
      {loading && <Loading />}
      <Toaster position="bottom-center" reverseOrder={false} />
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'grey',paddingBottom: '10px'  }}>
          Ingresa tu e-mail
        </Typography>
        <Typography component="h6"  sx={{ color: 'secondary.main' }}>
          {'* Te enviaremos un código a tu e-mail'}
        </Typography>
        <Typography component="h6"  sx={{ color: 'secondary.main' }}>
          {'para validar el cambio de contraseña !!!'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="e-mail"
            name="userName"
            // autoComplete="email"
            // autoFocus
            onChange={handleInput}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: '#fff' }}>Enviar</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgetPass