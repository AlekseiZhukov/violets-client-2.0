import { createSlice } from "@reduxjs/toolkit";

const violetsInBasketStorage =
  Object.keys(localStorage.getItem("violetsInBasket")).length > 0 &&
  JSON.parse(localStorage.getItem("violetsInBasket"));

const initialState = {
  violetsInBasket: violetsInBasketStorage || {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    violetToBasket: (state, action) => {
      state.violetsInBasket[action.payload] = 1;
    },
    violetWithOutBasket: (state, action) => {
      delete state.violetsInBasket[action.payload];
    },
  },
});
export const { violetToBasket, violetWithOutBasket } = basketSlice.actions;

export const basketSelector = (state) => state.basket.violetsInBasket;

export default basketSlice.reducer;
