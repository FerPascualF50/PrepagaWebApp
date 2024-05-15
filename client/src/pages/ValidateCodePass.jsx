import * as React from 'react';
import { useState } from 'react'
import { CircularProgress, Avatar, Button, TextField, Box, Typography, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { hasPassFormat, hasOnlyLetters } from "../utils/validation.js";
import { validateCodePassAsync } from '../store/authSlice.js'
import Loading from '../components/Loading.jsx';


const ValidateCodePass = () => {
  const [newUser, setNewUser] = useState()
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation();
  const userName = pathname.split('/input-code/')[1];
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
    if (!hasPassFormat(newUser.password)) return toast.error('La contraseña debe tener al menos 8 caracteres y al menos un número')
    if (newUser.code.length !== 6) return toast.error('El código de tener 6 cifras')
    const regexNumerico = /^[0-9]+$/;
    if (!regexNumerico.test(newUser.code)) return toast.error('El código debe contener solo números')
    const payload = { userName: userName, password: newUser.password, code: newUser.code }
    setLoading(true)
    const success = await dispatch(validateCodePassAsync(payload));
    success.payload.success
    ? (
      setLoading(true),
      setTimeout(() => {
        toast.success('Contrañena modificada. Ahora podras loguearte con tu nueva contraseña', {
          position: "top-center", duration: 5000
        });
      }, 50),
      setLoading(false),
      navigate('/login', { replace: true })
    )
    : (toast.error(`${success.payload.error}`))
  }
  const isLoggedIn = localStorage.getItem('access_token')

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard_user', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      {loading && <Loading />}
      <Toaster position="bottom-center" reverseOrder={false} />
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'grey', paddingBottom: '10px' }}>
          Introducí el código
        </Typography>
        <Typography component="h6" sx={{ color: 'secondary.main' }}>
          {'* Es un codigo de 6 números'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Tu código"
            name="code"
            autoComplete="off"
            onChange={handleInput}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Tu nueva password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={handleInput}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: '#fff' }}>Enviar</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ValidateCodePass