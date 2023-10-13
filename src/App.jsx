import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Login, Post, Registration, SharedLayout } from './pages'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
