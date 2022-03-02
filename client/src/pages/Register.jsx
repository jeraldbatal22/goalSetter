import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa'
import { registerAsync, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const { name, email, password, confirm_password } = formData

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
    if (password !== confirm_password) {
      toast.error('Password do not match')
    } else {
      const userData = { name, email, password }
      dispatch(registerAsync(userData))
    }
  }

  return (
    <div className='register'>
      <section className='register_section'>
        <h1><FaUser /> Register</h1>
        <h2>Please create an account</h2>
      </section>

      <section className='register_section'>
        <form onSubmit={onSubmitForm}>
          <input type="text" placeholder='Enter your name' name='name' onChange={onInputChange} value={name} />
          <input type="email" placeholder='Enter your email' name='email' onChange={onInputChange} value={email} />
          <input type="password" placeholder='Enter password' name='password' onChange={onInputChange} value={password} />
          <input type="password" placeholder='Confirm password' name='confirm_password' onChange={onInputChange} value={confirm_password} />
          <button type='submit'>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default Register