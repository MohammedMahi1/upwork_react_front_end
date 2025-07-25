import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const otpCancelAsync = createAsyncThunk(
  "otp/cancel",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;
    try {
      console.log("fff");
      const token = localStorage.getItem("token");      

      const res = await API_AXIOS.post("otp/cancel-otp-creating", {
        headers: {
          'Authorization': `Bearer ${token}` 
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(rejectWithValue(error));
    }
  }
);

type initialStateType = {
  message: string | null;
} & Record<string, any>;

const initialState: initialStateType = {
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
      console.log("sdcsdcsd");
      state.message = payload as string;
    });
  },
});

export default otpSlice.reducer;
