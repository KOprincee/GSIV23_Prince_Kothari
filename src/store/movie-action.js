import { movieAction } from "./movie-Slice";
import { uiActions } from "./ui-slice";

const initalCall = async (dispatch, page) => {
  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJjMGM5OTY5YWRkNDg4Zjc3YTNiMGIxODMyNTQ1MiIsInN1YiI6IjY0ZGE0YjBhMzcxMDk3MDBhYzQyNjNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EpCzZ3TglQW4v3fcJkv31NF5cjiNdkaRb2np8bgn3Lg",
        },
      }
    );

    const data = await response.json();
    return data;
  };

  const movieData = await fetchData();

  try {
    dispatch(
      movieAction.addMovieData({
        movieList: movieData.results,
        lastPage: movieData.total_pages,
      })
    );
  } catch (e) {
    throw new Error("Something went wrong");
  } finally {
    dispatch(uiActions.toggle());
    localStorage.removeItem("loadDone");
  }
};

export const fetchMovie = (page) => {
  return async (dispatch) => {
    initalCall(dispatch, page);
  };
};

export const searchMovie = (str, searchpage) => {
  return async (dispatch) => {
    dispatch(uiActions.toggle());

    if (str.length === 0) {
      dispatch(uiActions.toggle());
      dispatch(uiActions.removeSearch());
      initalCall(dispatch, "1");
    }

    if (searchpage === 1) dispatch(movieAction.resetState());
    dispatch(uiActions.setSearch());

    const searchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${str}&page=${searchpage}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJjMGM5OTY5YWRkNDg4Zjc3YTNiMGIxODMyNTQ1MiIsInN1YiI6IjY0ZGE0YjBhMzcxMDk3MDBhYzQyNjNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EpCzZ3TglQW4v3fcJkv31NF5cjiNdkaRb2np8bgn3Lg",
          },
        }
      );

      const data = await response.json();
      return data;
    };

    const movieData = await searchData();

    try {
      dispatch(
        movieAction.addMovieData({
          movieList: movieData.results,
          lastPage: movieData.total_pages,
        })
      );
    } catch (e) {
      throw new Error("Something went wrong");
    } finally {
      dispatch(uiActions.toggle());
    }
  };
};
