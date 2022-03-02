import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAsync, reset } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (user || isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    const userData = { email, password }
    dispatch(loginAsync(userData))
  }
  return (
    <div className='register'>
      <section className='register_section'>
        <h1><FaUser /> Login</h1>
        <h2>Login and start setting goals</h2>
      </section>

      <section className='register_section'>
        <form onSubmit={onSubmitForm}>
          <input placeholder='Enter your email' type="email" name="email" onChange={onInputChange} value={email} />
          <input placeholder='Enter password' type="password" name='password' onChange={onInputChange} value={password} />
          <button type='submit'>Login</button>
        </form>
      </section>
    </div>
  )
}

export default Login