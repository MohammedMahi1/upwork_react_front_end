import { API_AXIOS } from "@/api/API_AXIOS";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userAsync = createAsyncThunk("user/getUser", async (userId: string, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
    try{
        const data = await API_AXIOS.get('user',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return data.data;
    }catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
})


type initialState = {
  userId: string | null;
  name: string | null;
  email: string | null;
  isVerified: boolean;
};

const initialState: initialState = {
    name: null,
    email: null,
    userId: null,
    isVerified: false,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userAsync.pending, (state) => {
            state.isVerified = false;
        });
        builder.addCase(userAsync.fulfilled, (state, action) => {
            state.userId = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isVerified = action.payload.is_verified;
        });
        builder.addCase(userAsync.rejected, (state, action) => {
            state.isVerified = false;
            console.error("Error fetching user:", action.payload);
        });
    }
})


export default userSlice.reducer;