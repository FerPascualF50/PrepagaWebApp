import { Routes, Route, useParams, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Plans from './pages/Plans'
import Layout from './components/Layout'
import Faq from './pages/Faq'
import Centers from './pages/Centers'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import DashboardUser from './pages/DashUser'
import DashboardAdmin from './pages/DashAdmin'
import ForgetPass from './pages/ForgetPass'
import ValidateCodePass from './pages/ValidateCodePass'
import TabsAdmin from './pages/TabsAdmin'
import Users from './pages/Users'
import TabsUser from './pages/TabsUser'
import MyProfile from './pages/MyProfile'
import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { forcedLogin, validateLogin } from './store/authSlice'
axios.defaults.baseURL = import.meta.env.VITE_API_LOCAL_BASE_URL

const App = () => {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem('access_token')
  useEffect(() => {
    if (!access_token) return
    dispatch(validateLogin())
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path="/login/:userId" element={<Login />} />
        <Route path="/forget-pass" element={<ForgetPass />} />
        <Route path="/input-code/:userName" element={<ValidateCodePass />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/centers' element={<Centers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/dashboard-admin'>
          <Route index element={<DashboardAdmin />} />
          <Route path='invoicing' element={<TabsAdmin />} />
          <Route path='users' element={<Users />} />
        </Route>
        <Route path='/dashboard-user'>
          <Route index element={<DashboardUser />} />
          <Route path='manage' element={<TabsUser />} />
          <Route path='profile' element={<MyProfile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App;