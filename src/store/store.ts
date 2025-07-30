import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/modules/auth/authSlice'
import userSlice from '@/modules/user/userSlice'
import otpSlice from '@/modules/auth/otpSlice'
import forgetPassword from '@/modules/auth/forgotPassword'
import jobSlice from '@/modules/transport/jobSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    user:userSlice,
    otp:otpSlice,
    resetPassword:forgetPassword,
    job:jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch