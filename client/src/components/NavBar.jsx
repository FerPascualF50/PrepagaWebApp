import './NavBar.css';
import { Link } from 'react-router-dom'

const NavBar = () => {
   return (
      <nav className="nav_bar">
         {/* <button className="menu_button" >Menu</button> */}
         <ul>
            <Link className = 'link' to='/'>Home</Link>
            <Link className = 'link' to='/centers'>Centros de Atención</Link>
            <Link className = 'link' to='/plans'>Planes</Link>
            <Link className = 'link' to='/contact'>Contacto</Link>
            <Link className = 'link' to='/faq'>Preguntas Frecuentes</Link>
            <Link className = 'link' to='/login'>Login</Link>
            <Link className = 'link' to='/signup'>SignUp</Link>

         </ul>
         <button className="mi_cuenta_button">Mi Cuenta</button>
      </nav>
   );
};

export default NavBar;