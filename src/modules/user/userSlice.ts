import { API_AXIOS } from "@/api/API_AXIOS";
import type { User } from "@/types/User";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const updatePasswordAsync = createAsyncThunk(
  "user/updateUserPassword",
  async (formData: object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.put("user/update/password", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  "user/userProfile",
  async (formData: object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.put("user/update/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return console.log(rejectWithValue(error));
    }
  }
);

export const userAsync = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await API_AXIOS.get("user", {
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
  error?: string | null;
  message?: string | null;
} & User;

const initialState: initialState = {
  first_name: null,
  last_name: null,
  bio: null,
  img_name: null,
  img_url: null,
  email: null,
  id: null,
  is_verify: 0,
  isLoading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrorAndMessage: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // User Data
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

    //Update Profile
    builder.addCase(updateProfileAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(
      updateProfileAsync.fulfilled,
      (state, { payload }: PayloadAction<initialState>) => {
        state.isLoading = false;
        state.error = payload.error;
      }
    );
    builder.addCase(updateProfileAsync.rejected, (state, action) => {
      state.isLoading = false;
      console.error("Error fetching user:", action.payload);
    });

    //Update Current Password
    builder.addCase(updatePasswordAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(updatePasswordAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(updatePasswordAsync.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.error = payload.response.data.message;
      console.log(payload.response.data);
    });
  },
});
export const { clearErrorAndMessage } = userSlice.actions;
export default userSlice.reducer;
