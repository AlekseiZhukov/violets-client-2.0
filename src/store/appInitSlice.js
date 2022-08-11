import { createSlice } from "@reduxjs/toolkit";

const appInitSlice = createSlice({
  name: "appInit",
  initialState: {
    isTouch: false,
  },

  reducers: {
    touch: (state, action) => {
      state.isTouch = action.payload;
    },
  },
});

export const { touch } = appInitSlice.actions;
export const isTouchSelector = (state) => state.appInit.isTouch;

export default appInitSlice.reducer;
