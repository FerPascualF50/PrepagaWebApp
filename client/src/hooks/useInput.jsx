import React from 'react'

const useInput = (initialState) => {
   const [newUser, setNewUser] = useState(initialState, isSignIn)
   const [error, setError] = useState()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const funcion = isSignIn ? signInAsync : signUpAsync

   const handleInput = (e) => {
      const value = e.target.value
      const name = e.target.name
      setNewUser({
         ...newUser,
         [name]: value
      })
   }

   const handleSubmit = async (e) => {
      const res = await dispatch(funcion(newUser))
      if (!res.payload.success) return alert('Wrong credentials')
      navigate('/private')
   }
   return [handleInput, handleSubmit, error]
}

export default useInput