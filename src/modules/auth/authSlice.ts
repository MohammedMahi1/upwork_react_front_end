import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FormType } from "./types";
import { API_AXIOS } from "@/api/API_AXIOS";



//Register thunk
export const asyncRegister = createAsyncThunk("auth/register", async (formData: FormType,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await API_AXIOS.post("user/register", formData);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})



// Login thunk
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
} & FormType;


const initialState: initialState = {
  password_confirmation: null,
  email: null,
  name: null,
  password: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder.addCase(asyncRegister.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(asyncRegister.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('isVerified', payload.is_verify);
    });
    builder.addCase(
      asyncRegister.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        if (payload) {
          state.error = payload;
        } else {
          state.error = "An error occurred during registration.";
        }
      }
    );


    // Login
    builder.addCase(asyncLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(asyncLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem('token', payload.token);
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
export default authSlice.reducer;
