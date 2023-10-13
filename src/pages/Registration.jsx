import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormComponents/FormInput'
import { AiOutlineLock } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/userSlices'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Alert } from '../components'
import { fetchPosts } from '../redux/slices/postSlices'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const [showAlert, setShowAlert] = useState(false)
  const userData = useSelector((store) => store.user)
  const { userInfo, success, loading, appErr } = userData
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(values))
  }
  useEffect(() => {
    if (appErr) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 1000)
    }
    if (success) {
      toast('User created Successfully...', { position: 'top-center' })
      dispatch(fetchPosts())
    }
  }, [appErr, dispatch, success])
  return (
    <>
      {userInfo ? (
        navigate('/')
      ) : (
        <div className='border-2 shadow-lg px-4 py-4 m-10 md:mx-[20%] lg:mx-[30%]'>
          <div className='text-center'>
            <AiOutlineLock
              color='white'
              size={36}
              className='bg-red-300 p-2 rounded-full mx-auto'
            />
            <h2 className='text-3xl font-semibold py-2'>Sign Up</h2>
          </div>
          <div>
            {showAlert && <Alert errors={appErr} />}
            <form onSubmit={handleFormSubmit} className='space-y-3'>
              <div className='grid grid-cols-2 space-x-3 '>
                <FormInput
                  name='firstName'
                  labelText='First Name'
                  value={values.firstName}
                  handleChange={handleChange}
                  placeholder='Enter First Name'
                />
                <FormInput
                  name='lastName'
                  labelText='Last Name'
                  value={values.lastName}
                  handleChange={handleChange}
                  placeholder='Enter Last Name'
                />
              </div>
              <FormInput
                name='email'
                type='email'
                labelText='Email'
                value={values.email}
                handleChange={handleChange}
                placeholder='Enter Your email'
              />
              <FormInput
                name='password'
                type='password'
                labelText='Password'
                value={values.password}
                handleChange={handleChange}
                placeholder='Enter password'
              />
              <FormInput
                name='confirmPassword'
                type='password'
                labelText='Repeat Password'
                value={values.confirmPassword}
                handleChange={handleChange}
                placeholder='Confirm your password'
              />
              <div className='flex space-x-3'>
                <button
                  disabled={loading}
                  type='submit'
                  className='form-button'
                >
                  Sign Up
                </button>
                <button disabled={loading} className='form-button'>
                  Google Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Registration
