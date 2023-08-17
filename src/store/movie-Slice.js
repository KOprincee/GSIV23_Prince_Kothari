import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  currentPage: 1,
  lastPage: 0,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovieData(state, action) {
      const data = action.payload;
      state.movieList.push(...data.movieList);
      state.currentPage++;
      state.lastPage = data.lastPage;
    },
    resetState(state) {
      state.movieList = [];
      state.currentPage = 1;
      state.lastPage = 0;
    },
    resetPageCount(state) {
      state.currentPage = 1;
    },
  },
});

export const movieAction = movieSlice.actions;

export default movieSlice;
