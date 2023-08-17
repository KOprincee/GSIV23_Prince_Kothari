import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: true,
    isSearch: false,
  },
  reducers: {
    toggle(state) {
      state.isLoading = !state.isLoading;
    },
    setSearch(state) {
      state.isSearch = true;
    },
    removeSearch(state) {
      state.isSearch = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
