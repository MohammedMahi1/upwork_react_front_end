import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendForgetPassword = createAsyncThunk(
  "forget/send",
  async (email:object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.post("user/forgot-password", email);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
type InitialStateType = {
  isLoading: boolean;
  error: string | null;
  message: string | null;
};
const initialState: InitialStateType = {
  isLoading: false,
  error: null,
  message: null,
};

const forgetPassword = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {


    // Send request forgeting password
    builder.addCase(sendForgetPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sendForgetPassword.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload as string;
    });

    builder.addCase(sendForgetPassword.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });

  },
});

export default forgetPassword.reducer;
