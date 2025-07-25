import { API_AXIOS } from "@/api/API_AXIOS";
import type { User } from "@/types/User";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const userAsync = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.get("user",{
                headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

type initialState = {
  isLoading: boolean;
}& User

const initialState: initialState = {
  first_name: null,
  last_name: null,
  bio:null,
  img_name:null,
  img_url:null,
  email: null,
  id: null,
  is_verify: 0,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      userAsync.fulfilled,
      (state, { payload }: PayloadAction<initialState>) => {

        state.isLoading = false;
        state.id = payload.id;
        state.first_name = payload.first_name;
        state.last_name = payload.last_name;
        state.bio = payload.bio;
        state.img_url = payload.img_url;
        state.img_name = payload.img_name;
        state.email = payload.email;
        state.is_verify = payload.is_verify;
      }
    );
    builder.addCase(userAsync.rejected, (state, action) => {
      state.isLoading = false;
      console.error("Error fetching user:", action.payload);
    });
  },
});

export default userSlice.reducer;
