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

export const addJobAsync = createAsyncThunk("transport/addJob", 
  async (job: Omit<JobType,"id" | "postedDate" | "status">, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
    try {
        const res = await API_AXIOS.post("/transport/jobs/add", job, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

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
  reducers: {
    filterJobs: (state, action) => {
      state.jobs = state.jobs.sort((a,_) =>{
        if (action.payload === "completed") {
          return a.job_status === "completed" ? -1 : 1;
        } else if (action.payload === "pending") {
          return a.job_status === "pending" ? -1 : 1;
        }
        else if (action.payload === "assigned") {
          return a.job_status === "assigned" ? -1 : 1;
        }return 0;
      } );    
    }
  },
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


      // Handle the addJobAsync thunk
    builder
      .addCase(addJobAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJobAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});
export const { filterJobs } = jobSlice.actions;
export default jobSlice.reducer;
