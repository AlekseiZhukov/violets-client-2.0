import { configureStore } from "@reduxjs/toolkit";
import violetsSlice from "./violetsSlice";
import basketSlice from "./basketSlice";

export const store = configureStore({
  reducer: {
    violets: violetsSlice,
    basket: basketSlice,
  },
});
