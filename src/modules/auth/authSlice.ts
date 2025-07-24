import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormType } from "./types";
import { API_AXIOS } from "@/api/API_AXIOS";


export const asyncLogin = createAsyncThunk("auth/login", async (formData: FormType,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await API_AXIOS.post("user/login",formData)
        console.log(res);
        
    } catch (error:any) {
        return rejectWithValue(error.response.data.message)
        
    }
});



const initialState:FormType = {
confirmPassword: null,
email: null,
name: null,
password: null,
isLoading: false,
error: null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // Login
        builder.addCase(asyncLogin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(asyncLogin.fulfilled, (state, {payload}) => {
            state.isLoading = false;

        });
        builder.addCase(asyncLogin.rejected, (state, {payload}:PayloadAction<any>) => {
            state.isLoading = false;
            if (payload) {
                state.error = payload;
            } else {
                state.error = "An error occurred during login.";
            }
        });
    }
})

export default authSlice.reducer;