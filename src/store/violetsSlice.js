import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: {},
  isLoading: false,
  data: null,
  error: "",
};

export const fetchViolets = createAsyncThunk(
  "violets/fetchAll",
  async (page, thunkApi) => {
    try {
      const body = await fetch(
        `http://localhost:3000/api/homePage/${page}`
      ).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
      //console.log("fetchViolets body ", body);
      return body;
    } catch (e) {
      console.log("router.get catch (e)", e);
      return thunkApi.rejectWithValue(e.message || "ответ не ok");
    }
  }
);

export const violetsSlice = createSlice({
  name: "violets",
  initialState,
  reducers: {
    likedViolets: (state, action) => {
      state.card = action.payload;
    },
    like: (state, action) => {
      state.card[action.payload] = !state.card[action.payload];
    },
  },
  extraReducers: {
    [fetchViolets.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchViolets.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    },
    [fetchViolets.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { like, likedViolets } = violetsSlice.actions;
export const violetsIsLoadingSelector = (state) => state.violets.isLoading;
export const violetsDataSelector = (state) => state.violets.data;
export const violetsCardTitleSlugSelector = (state) => state.violets.card;

export default violetsSlice.reducer;
