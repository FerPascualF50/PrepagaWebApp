import styles from '../components/styles/nav_bar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'

const NavBar = () => {
  const { user } = useSelector((state) => state.auth)
  console.log(user)
   const dispatch = useDispatch()
   return (
      <nav className={styles.nav_bar}>
         {/* <button className="menu_button" >Menu</button> */}
         <ul>
            <Link className = {styles.link} to='/'>Home</Link>
            <Link className = {styles.link} to='/centers'>Centros de Atención</Link>
            <Link className = {styles.link} to='/plans'>Planes</Link>
            <Link className = {styles.link} to='/contact'>Contacto</Link>
            <Link className = {styles.link} to='/faq'>Preguntas Frecuentes</Link>
            <Link className = {styles.link} to='/login'>Login</Link>
            <Link className = {styles.link} to='/signup'>SignUp</Link>
         </ul>
         <button className="mi_cuenta_button">Mi Cuenta</button>
         <h3>Hola, {user || 'Desconocido'}</h3>
         {user && <h4 onClick={() => dispatch(logout())}>Logout</h4>}
      </nav>
   );
};

export default NavBar;