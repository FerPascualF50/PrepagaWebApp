import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/signUp'
import Login from './pages/LogIn'
import Plans from './pages/Plans'
import Layout from './components/Layout'
import Faq from './pages/Faq'
import Centers from './pages/Centers'
import Contact from './pages/Contact'
import './App.css'

const App = () => {
   return (
      <Layout>
         <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/signup' element={<SignUp />} />
               <Route path='/login' element={<Login />} />
               <Route path='/plans' element={<Plans />} />
               <Route path='/centers' element={<Centers />} />
               <Route path='/contact' element={<Contact />} />
               <Route path='/faq' element={<Faq />} />

               <Route path='*' element={<h1>404!!</h1>} />
            </Routes>
      </Layout>
   )
}

export default App
