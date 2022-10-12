import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authDataFromSessionStorage =
  sessionStorage.getItem("adminData") &&
  JSON.parse(sessionStorage.getItem("adminData"));

const initialState = {
  isLoading: false,
  error: "",
  authData: authDataFromSessionStorage || { token: null },
  isAuth: !!authDataFromSessionStorage,
};

export const fetchAuth = createAsyncThunk("auth", async (data, thunkApi) => {
  console.log("fetchAuth createAsyncThunk");
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
  reducers: {
    cleanAuthState: (state) => {
      state.isLoading = false;
      state.authData = null;
      state.isAuth = false;
      state.error = "";
    },
  },
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

export const { cleanAuthState } = authSlice.actions;

//export const authIsLoadingSelector = (state) => state.auth.isLoading;
export const authStatusSelector = (state) => state.auth.isAuth;
export const authDataSelector = (state) => state.auth.authData;
export const authErrorSelector = (state) => state.auth.error;

export default authSlice.reducer;
