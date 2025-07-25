import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const otpCancelAsync = createAsyncThunk(
  "otp/cancel",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;
    try {
      const res= await API_AXIOS.delete("otp/cancel-otp-creating", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

type initialStateType = {
  message: string | null;
  isLoading: boolean;
} & Record<string, any>;

const initialState: initialStateType = {
  message: null,
  isLoading: false,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(otpCancelAsync.pending, (state) => {
      state.message = null;
      state.isLoading = true;
    });
    builder.addCase(otpCancelAsync.fulfilled, (state, { payload }) => {
      state.message = payload.message as string
      state.isLoading = false;
      localStorage.removeItem("token")
      localStorage.removeItem("isVerified")
    });
    builder.addCase(otpCancelAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log("sdcsdcsd");
      state.message = payload as string;
    });
  },
});

export default otpSlice.reducer;
