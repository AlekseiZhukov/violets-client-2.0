import { configureStore } from "@reduxjs/toolkit";
import violetsSlice from "./violetsSlice";

export const store = configureStore({
  reducer: {
    violets: violetsSlice,
  },
});
