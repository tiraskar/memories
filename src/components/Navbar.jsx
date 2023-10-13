import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux/slices/userSlices'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchPosts } from '../redux/slices/postSlices'
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((store) => store.user)

  const logout = () => {
    dispatch(logoutUser())
    if (logoutUser.fulfilled) {
      navigate('/')
      dispatch(fetchPosts())
      toast.info('Logout Successful...', { position: 'top-center' })
    }
  }

  useEffect(() => {}, [dispatch])

  return (
    <>
      <div className=' py-5  w-full'>
        <div className='  max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center px-5  md:px-10 py-2 md:mx-20 mt-5 overflow-hidden  border-2 rounded-lg shadow-md'>
          <div className='text-2xl font-semibold items-center uppercase'>
            <Link to='/'>Memories</Link>
          </div>
          <div className='flex items-center py-4 md:py-0 space-x-3'>
            {userInfo ? (
              <div className=' space-x-3'>
                <span className='bg-violet-300 px-2 rounded-3xl text-lg font-semibold'>
                  {userInfo.user.firstName.charAt(0)}
                </span>
                <span className='text-lg'>
                  {` ${userInfo.user.lastName} ${userInfo.user.firstName}`}
                </span>
                <button
                  onClick={logout}
                  className='border-2   px-3 py-1 rounded-lg bg-red-500 text-white'
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className='space-x-3'>
                <button className='border-2   px-3 py-1 rounded-lg bg-blue-500 text-white'>
                  <Link to='/login'>Sign In</Link>
                </button>
                <button className='border-2   px-3 py-1 rounded-lg bg-red-500 text-white'>
                  <Link to='/registration'>Sign Up</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
