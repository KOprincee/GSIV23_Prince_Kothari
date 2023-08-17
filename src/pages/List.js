import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie, searchMovie } from "../store/movie-action";
import { uiActions } from "../store/ui-slice";
import ListHeader from "../components/ListHeader";
import Spinner from "../spinner/spinner";
import Movie from "../components/Movie";
import "./List.css";

localStorage.setItem("loadDone", "true");

const List = () => {
  const dispatch = useDispatch();
  const newPage = useSelector((state) => state.movie.currentPage);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const isSearch = useSelector((state) => state.ui.isSearch);
  const lastPage = useSelector((state) => state.movie.lastPage);

  //handles infinte scrolling
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    //scrolling for search results
    if (isSearch && lastPage !== newPage - 1) {
      dispatch(
        searchMovie(
          document.getElementsByClassName("search-box")[0].value,
          newPage
        )
      );
    }
    //scrolling for upcoming movies
    else if (!isSearch && lastPage !== newPage - 1) {
      dispatch(uiActions.toggle());
      dispatch(fetchMovie(newPage));
    }
  }, [dispatch, newPage, isSearch, lastPage]);

  //handles the loading of the list page for the first time
  useEffect(() => {
    if (localStorage.getItem("loadDone") === "true") {
      dispatch(fetchMovie(newPage));
    }
  }, []);

  //handles the loading of the list page after scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {isLoading && <Spinner />}
      <ListHeader
        childClass="search-div"
        clickEvent={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <form>
          <input
            type="search"
            className="search-box"
            placeholder="Search"
            onChange={(e) => dispatch(searchMovie(e.target.value, 1))}
          />
        </form>
      </ListHeader>
      <div className="movie-cards">
        <Movie />
      </div>
      {lastPage === newPage - 1 && !isLoading && (
        <div className="page-end">
          <h1>That's All folks ✌</h1>
        </div>
      )}
    </>
  );
};

export default List;
