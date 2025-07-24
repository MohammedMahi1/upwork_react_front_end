import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const otpCancelAsync = createAsyncThunk(
  "otp/cancel",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;
    try {
      const res = await API_AXIOS.delete("user/cancel-otp-creating",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

type initialStateType = {
  message: string | null;
} & Record<string, any>;

const initialState:initialStateType = {
  message: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(otpCancelAsync.pending, (state) => {
      state.message = null;
    });
    builder.addCase(otpCancelAsync.fulfilled, (state, { payload }) => {
      state.message = payload.message;
        localStorage.removeItem("token");
    });
    builder.addCase(otpCancelAsync.rejected, (state, { payload }) => {
      state.message = payload as string;
    });
  },
});

export default otpSlice.reducer;
