import { configureStore } from "@reduxjs/toolkit";
import violetsSlice from "./violetsSlice";
import basketSlice from "./basketSlice";
import { violetsAPI } from "../api/violetsAPI";

export const store = configureStore({
  reducer: {
    violets: violetsSlice,
    basket: basketSlice,
    [violetsAPI.reducerPath]: violetsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(violetsAPI.middleware),
});
