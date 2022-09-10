import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
/*const likedVioletsStorage =
  Object.keys(localStorage.getItem("likedViolet")).length > 0 &&
  JSON.parse(localStorage.getItem("likedViolet"));*/

const initialState = {
  isLoading: false,
  error: "",
  authData: null,
  isAuth: false,
};

export const fetchAuth = createAsyncThunk("auth", async (data, thunkApi) => {
  try {
    return await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    });
  } catch (e) {
    return thunkApi.rejectWithValue(e.toString());
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [fetchAuth.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAuth.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.authData = action.payload;
      state.isAuth = true;
      state.error = "";
    },
    [fetchAuth.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
      state.authData = null;
    },
  },
});

export const authIsLoadingSelector = (state) => state.auth.isLoading;
export const authStatusSelector = (state) => state.auth.isAuth;
export const authDataSelector = (state) => state.auth.authData;
export const authErrorSelector = (state) => state.auth.error;

export default authSlice.reducer;
