import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormComponents/FormInput'
import { AiOutlineLock } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/userSlices'
import { Alert } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchPosts } from '../redux/slices/postSlices'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.user)
  const [showAlert, setShowAlert] = useState(false)

  const { loading, appErr, userInfo, success } = userData

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(values))
  }

  useEffect(() => {
    if (appErr) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }

    if (success) {
      toast.success('Login Successful...', { position: 'top-center' })
      dispatch(fetchPosts())
    }
  }, [appErr, success, dispatch])

  return (
    <>
      {userInfo ? (
        navigate('/')
      ) : (
        <div className='border-2 shadow-lg text-lg m-10 py-10 px-10 items-center md:mx-40 lg:w-2/5 lg:mx-auto lg:px-10 '>
          <div className='text-center'>
            <AiOutlineLock
              color='white'
              size={36}
              className='bg-red-300 p-2 rounded-full mx-auto'
            />
            <h2 className='text-3xl font-semibold py-2'>Sign In</h2>
          </div>

          <div className=''>
            {showAlert && <Alert errors={appErr} />}
            <form onSubmit={handleFormSubmit} className='space-y-4 '>
              <FormInput
                labelText='Email'
                name='email'
                value={values.email}
                type='email'
                handleChange={handleChange}
                placeholder='Enter your email'
              />
              <FormInput
                labelText='Password'
                name='password'
                value={values.password}
                type='password'
                handleChange={handleChange}
                placeholder='Enter your password'
              />
              <div className='flex space-x-3'>
                <button
                  type='submit'
                  className='form-button'
                  disabled={loading}
                >
                  Login
                </button>
                <button className='form-button bg-green-400'>
                  Google Login
                </button>
              </div>
            </form>
            <div className='py-3 space-y-3'>
              <h2>Don't have an account? </h2>
              <button className='form-button bg-gray-300'>
                <Link to='/registration'>Create New</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
