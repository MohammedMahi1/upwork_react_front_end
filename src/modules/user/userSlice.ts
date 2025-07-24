import { createSlice } from "@reduxjs/toolkit";



type initialState = {
  userId: string | null;
  name: string | null;
  email: string | null;
};

const initialState: initialState = {
    name: null,
    email: null,
    userId: null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{}
})


export default userSlice.reducer;