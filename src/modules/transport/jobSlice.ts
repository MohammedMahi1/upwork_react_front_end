import { API_AXIOS } from "@/api/API_AXIOS";
import type { JobType } from "@/types/JobType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const jobAsync = createAsyncThunk(
  "transport/jobs",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.get("/transport/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


type initialStateType = {
  jobs: JobType[];
  isLoading: boolean;
  error: string | null;
};
const initialState: initialStateType = {
  jobs: [],
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the jobAsync thunk
    builder
      .addCase(jobAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(jobAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs as JobType[];
        state.error = null;
      })
      .addCase(jobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobSlice.reducer;
