import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import SignUp from './pages/signUp'
// import Login from './pages/LogIn'
import Plans from './pages/Plans'
import Layout from './components/Layout'
import Faq from './pages/Faq'
import Centers from './pages/Centers'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import SignIn from './pages/LoginMui'
import SignUpMui from './pages/SignUpMui'
import DashboardUser from './pages/DashUser'
import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { forcedLogin, validateLogin } from './store/authSlice'

const App = () => {
  const access_token = localStorage.getItem('access_token')
  const dispatch = useDispatch()
  useEffect(() => {
    if (!access_token) return
      dispatch(validateLogin())
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/signup' element={<SignUp />} /> */}
        <Route path='/signup' element={<SignUpMui />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/login' element={<SignIn />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/centers' element={<Centers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/dashboard_user' element={<DashboardUser />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
