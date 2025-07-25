import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/modules/auth/authSlice'
import userSlice from '@/modules/user/userSlice'
import otpSlice from '@/modules/auth/otpSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    user:userSlice,
    otp:otpSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch