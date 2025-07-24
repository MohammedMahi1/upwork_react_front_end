import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FormType } from "./types";
import { API_AXIOS } from "@/api/API_AXIOS";

export const asyncLogin = createAsyncThunk(
  "auth/login",
  async (formData: FormType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.post("user/login", formData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

type initialState = {
  isAuth: boolean;
  token: string | null;
} & FormType;

const initialState: initialState = {
  confirmPassword: null,
  email: null,
  name: null,
  password: null,
  isLoading: false,
  error: null,
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(asyncLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(asyncLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.token = payload.token;
      state.isAuth = true;
      localStorage.setItem("isAuth",payload.is_auth.toString());
      localStorage.setItem("token",payload.token);
    });

    builder.addCase(
      asyncLogin.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        if (payload) {
          state.error = payload;
        } else {
          state.error = "An error occurred during login.";
        }
      }
    );
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
