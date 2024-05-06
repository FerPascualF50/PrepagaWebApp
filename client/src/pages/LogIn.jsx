import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signInAsync } from '../store/authSlice'
import styles from '../components/styles/login.module.css'

const initialState = {
  userName: '',
  password: ''
}
const Login = () => {
  const [newUser, setNewUser] = useState(initialState)
  const dispatch = useDispatch()
  const handleInput = (e) => {
    const value = e.target.value
    const name = e.target.name
    setNewUser({
      ...newUser,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(signInAsync(newUser))
  };

  return (
    <div className={styles.login_container} >
      <h2>Inicia sesión</h2>
      <form>
        {/* <form onSubmit={handleSubmit}> */}

        <div className={styles.form_group}>
          {/* <label htmlFor="email">Tu e-mail:</label> */}
          <input
            type="text"
            // id="email"
            name='userName'
            // value={email}
            onChange={handleInput}
          // required
          />
        </div>
        <div className={styles.form_group}>
          {/* <label htmlFor="password">Contraseña:</label> */}
          <input
            type="text"
            // id="password"
            name='password'
            // value={password}
            onChange={handleInput}
          // required
          />
        </div>
      </form>
      <button
        type="submit" 
        onClick={handleSubmit}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
