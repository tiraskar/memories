import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../utils/url'
import { userInLocalStorage } from './userSlices'

export const fetchPosts = createAsyncThunk(
  'post/fetchPost',
  async (postData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}/posts`, postData)
      return response?.data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const createPost = createAsyncThunk(
  'post/createNewPost',
  async (createPost, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}/posts/create`, createPost)
      dispatch(fetchPosts())
      return response?.data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const getSinglePost = createAsyncThunk(
  'post/singlePost',
  async (postData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/posts/${postData}`, postData)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (deleteData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/posts/${deleteData}`,
        deleteData
      )
      dispatch(fetchPosts())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const likePost = createAsyncThunk(
  'post/likePost',
  async (likeData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${baseUrl}/posts/${likeData}`,
        likeData
      )
      dispatch(fetchPosts())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

const user = JSON.parse(userInLocalStorage)

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    creator: user
      ? {
          firstName: user.user.firstName,
          lastName: user.user.lastName,
          email: user.user.email,
        }
      : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get all posts
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.allPosts = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      //create post
      .addCase(createPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.success = action?.payload?.msg
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      //get single post
      .addCase(getSinglePost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPost = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      //delete post
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.deletedPost = action?.payload?.msg
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export const { selectedPost } = postSlice.actions

export default postSlice.reducer
