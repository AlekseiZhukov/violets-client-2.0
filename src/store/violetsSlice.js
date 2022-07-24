import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const likedVioletsStorage =
  Object.keys(localStorage.getItem("likedViolet")).length > 0 &&
  JSON.parse(localStorage.getItem("likedViolet"));

const initialState = {
  likedCards: likedVioletsStorage || {},
  isLoading: false,
  data: null,
  error: "",
};

export const fetchViolets = createAsyncThunk(
  "violets/fetchAll",
  async ({ page, searchValue }, thunkApi) => {
    try {
      if (!searchValue) {
        return await fetch(`http://localhost:3000/api/homePage/${page}`).then(
          (res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          }
        );
      }
      return await fetch(
        `http://localhost:3000/api/homePage?page=${page}&q=${searchValue}`
      ).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
    } catch (e) {
      return thunkApi.rejectWithValue(e.message || "ответ не ok");
    }
  }
);

const violetsSlice = createSlice({
  name: "violets",
  initialState,
  reducers: {
    likedViolets: (state, action) => {
      state.likedCards = action.payload;
    },
    like: (state, action) => {
      state.likedCards[action.payload] = !state.likedCards[action.payload];
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
export const violetsCardTitleSlugSelector = (state) => state.violets.likedCards;
export const violetsErrorSlugSelector = (state) => state.violets.error;

export default violetsSlice.reducer;
