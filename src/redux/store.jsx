import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlices'
import userReducer from './slices/userSlices'
const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
})

export default store
