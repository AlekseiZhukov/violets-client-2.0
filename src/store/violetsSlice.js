import { createSlice } from "@reduxjs/toolkit";
const likedVioletsStorage =
  Object.keys(localStorage.getItem("likedViolet")).length > 0 &&
  JSON.parse(localStorage.getItem("likedViolet"));

const initialState = {
  likedCards: likedVioletsStorage || {},
};

const violetsSlice = createSlice({
  name: "violets",
  initialState,
  reducers: {
    like: (state, action) => {
      state.likedCards[action.payload] = !state.likedCards[action.payload];
    },
  },
});

export const { like } = violetsSlice.actions;
export const violetsCardTitleSlugSelector = (state) => state.violets.likedCards;

export default violetsSlice.reducer;
