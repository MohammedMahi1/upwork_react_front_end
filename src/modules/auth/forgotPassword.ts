import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";



// This function sends a request to the server to initiate the password reset process
export const sendForgetPassword = createAsyncThunk(
  "forget/send",
  async (email:object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.post("user/forgot-password", email);
      return res.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// This function updates the password after the user has forgotten it
export const updateForgotedPassowrd = createAsyncThunk(
  "forget/update",
  async (formData:object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.post("user/reset-password", formData);
      return res.data;
      
    } catch (error :any) {
      return rejectWithValue(error.response.data.message);
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


    // Update forgot password
    builder.addCase(updateForgotedPassowrd.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateForgotedPassowrd.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload ;
    });

    builder.addCase(updateForgotedPassowrd.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });




    // Send request forgeting password
    builder.addCase(sendForgetPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sendForgetPassword.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      console.log(payload);
      
    });

    builder.addCase(sendForgetPassword.rejected, (state, { payload }:PayloadAction<any>) => {
      state.isLoading = false;
      state.error = payload ;
    
    });

  },
});

export default forgetPassword.reducer;
