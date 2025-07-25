import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const otpCancelAsync = createAsyncThunk(
  "otp/cancel",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;
    try {
      const res = await API_AXIOS.delete("otp/cancel-otp-creating", {
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


export const otpResendAsync = createAsyncThunk("otp/resend",async(_,thunkAPI)=>{
  const {rejectWithValue} = thunkAPI
  try {
    const res = await API_AXIOS.post("otp/send",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }) 
    console.log(res);
    return res.data
    
  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
})


export const otpVerifyAsync = createAsyncThunk("otp/verify",async(otp_code:string | null,thunkAPI)=>{
  const {rejectWithValue} = thunkAPI
  try {
    const res = await API_AXIOS.post("otp/verify",{
      otp_code:otp_code
    },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }) 
    console.log(res);
    return res.data
    
  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
})

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
    //Send Code Verification
    builder.addCase(otpVerifyAsync.pending,(state)=>{
        state.isLoading = true;

    });
    builder.addCase(otpVerifyAsync.fulfilled,(state,{payload})=>{
        state.isLoading = false
        localStorage.setItem("isVerified","1")
    });
    builder.addCase(otpVerifyAsync.rejected,(state,{ payload }:PayloadAction<any>)=>{
      state.isLoading = false
      state.message = payload.message
    });


    //Resend OTP
    builder.addCase(otpResendAsync.pending,(state)=>{
        state.isLoading = true;

    });
    builder.addCase(otpResendAsync.fulfilled,(state,{payload})=>{
        state.isLoading = false
    });
    builder.addCase(otpResendAsync.rejected,(state,{ payload }:PayloadAction<any>)=>{
      state.isLoading = false
      state.message = payload.message
    });



    // Canceling Otp Registring
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
    builder.addCase(otpCancelAsync.rejected, (state, { payload }:PayloadAction<any>) => {
      state.isLoading = false;
      console.log("sdcsdcsd");
      state.message = payload.message;
    });
  },
});

export default otpSlice.reducer;
