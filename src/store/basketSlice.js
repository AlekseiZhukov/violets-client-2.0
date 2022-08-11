import { createSlice } from "@reduxjs/toolkit";

const violetsInBasketStorage =
  localStorage.getItem("violetsInBasket") &&
  localStorage.getItem("violetsInBasket").length > 0 &&
  JSON.parse(localStorage.getItem("violetsInBasket"));

const initialState = {
  violetsInBasket: violetsInBasketStorage || [],
  dataForTotalCost: [],
  finishOrder: {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    violetToBasket: (state, action) => {
      state.violetsInBasket.push(action.payload);
    },
    violetWithOutBasket: (state, action) => {
      const newVioletsInBasket = state.violetsInBasket.filter(
        (item) => item !== action.payload
      );
      state.violetsInBasket = newVioletsInBasket;
    },
    violetToTotalCost: (state, action) => {
      if (state.dataForTotalCost.length === 0) {
        state.dataForTotalCost.push(action.payload);
      }
      const newDataForTotalCost = state.dataForTotalCost.filter((item) => {
        if (
          Object.entries(item)[0][0] !== Object.entries(action.payload)[0][0]
        ) {
          return item;
        }
      });
      newDataForTotalCost.push(action.payload);

      state.dataForTotalCost = newDataForTotalCost;
    },

    orderFormation: (state, action) => {
      state.finishOrder = { ...state.finishOrder, ...action.payload };
    },
    clearBasket: (state) => {
      state.violetsInBasket = [];
      state.dataForTotalCost = [];
      state.finishOrder = {};
    },
  },
});
export const {
  violetToBasket,
  violetWithOutBasket,
  violetToTotalCost,
  orderFormation,
  clearBasket,
} = basketSlice.actions;

export const basketSelector = (state) => state.basket.violetsInBasket;
export const finishOrderSelector = (state) => state.basket.finishOrder;
export const dataForTotalCostSelector = (state) =>
  state.basket.dataForTotalCost;

export default basketSlice.reducer;
