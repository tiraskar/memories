import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseUrl } from '../../utils/url'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.post(
        `${baseUrl}/auth/login`,
        userData,
        config
      )

      //saving login details in local storage
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  localStorage.removeItem('user')
})

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/register`,
        registerData
      )

      localStorage.setItem('user', JSON.stringify(response.data))
      return response?.data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const userInLocalStorage = localStorage.getItem('user')

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInLocalStorage ? JSON.parse(userInLocalStorage) : null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action?.payload
        state.success = action?.payload.msg
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = null
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action?.payload
        state.success = action?.payload?.msg
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default userSlice.reducer
