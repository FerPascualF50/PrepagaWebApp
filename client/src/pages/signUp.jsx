import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signUpAsync } from '../store/authSlice'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { hasEmptyField, isEmail, hasOnlyLetters, hasPassFormat } from "../utils/validation.js";
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading.jsx'

const SignUp = () => {
  const [newUser, setNewUser] = useState()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInput = (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    setNewUser({
      ...newUser,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (hasEmptyField(newUser)) return toast.error('Todos los campos son obligatorios')
    if (!hasOnlyLetters({ fisrtName: newUser.firstName, lastName: newUser.lastName })) return toast.error('Ups... nombre o apellido con:\n*Caracteres invàlidos ó\n*Caracteres vacios')
    if (!isEmail(newUser.userName)) return toast.error('ingresa un email válido')
    if (!hasPassFormat(newUser.password)) return toast.error('La contraseña debe tener al menos 8 caracteres y al menos un número')
    setLoading(true);

    const success = await dispatch(signUpAsync(newUser));
    setLoading(false);

    success.payload.success
      ? (
        setLoading(true),
        setTimeout(() => {
          toast.success('Tu usuario se creó con éxito.\n\nIngresa a tu e-mail para validarlo, y luego logueate.', {
            position: "top-center", duration: 5000
          });
        }, 50),
        setLoading(false),
        navigate('/login', { replace: true })
      )
      : (toast.error(`${success.payload.error}`))
  }
  return (
    <Container component="main" maxWidth="xs">
      <Toaster position="bottom-center" reverseOrder={false} />
      <CssBaseline />
      {loading && <Loading />}
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'grey' }}>
          Registrate
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" required fullWidth autoFocus
                name="firstName"
                id="firstName"
                label="Tu primer nombre"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth
                id="lastName"
                label="Tu apellido"
                name="lastName"
                autoComplete="family-name"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                id="email"
                label="Tu e-mail"
                name="userName"
                autoComplete="email"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth
                name="password"
                label="Tu password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleInput}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: '#fff' }}>
            Crear
          </Button>
          <Grid container justifyContent="flex-end" >
            <Grid item>
              <Link href="/login" variant="body2">
                Si ya tenes tu cuenta, logueate aqui.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default SignUp