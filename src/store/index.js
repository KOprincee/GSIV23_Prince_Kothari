import { configureStore } from "@reduxjs/toolkit";

import movieSlice from "./movie-Slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { movie: movieSlice.reducer, ui: uiSlice.reducer },
});

export default store;
