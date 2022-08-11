import { configureStore } from "@reduxjs/toolkit";

import violetsSlice from "./violetsSlice";
import basketSlice from "./basketSlice";
import appInitSlice from "./appInitSlice";
import { violetsAPI } from "../api/violetsAPI";

export const store = configureStore({
  reducer: {
    violets: violetsSlice,
    appInit: appInitSlice,
    basket: basketSlice,

    [violetsAPI.reducerPath]: violetsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(violetsAPI.middleware),
});
