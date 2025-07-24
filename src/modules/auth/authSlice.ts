import { createSlice } from "@reduxjs/toolkit";
import type { FormType } from "./types";



const initialState:FormType = {
confirmPassword: null,
email: null,
name: null,
password: null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{}
})

export default authSlice.reducer;