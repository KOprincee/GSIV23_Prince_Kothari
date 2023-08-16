import React, { useCallback, useEffect, useState } from "react";
import ListHeader from "../components/ListHeader";
import MovieCard from "../components/MovieCard";
import "./List.css";
import Spinner from "../spinner/spinner";

const List = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getMovies = useCallback(async () => {
    setIsLoading(true);
    await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJjMGM5OTY5YWRkNDg4Zjc3YTNiMGIxODMyNTQ1MiIsInN1YiI6IjY0ZGE0YjBhMzcxMDk3MDBhYzQyNjNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EpCzZ3TglQW4v3fcJkv31NF5cjiNdkaRb2np8bgn3Lg",
      },
    })
      .then((response) => response.json())
      .then((movieData) => {
        setMovieData((prevItems) => [...prevItems, ...movieData.results]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      });
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getMovies();
  }, [isLoading, getMovies]);

  useEffect(() => {
    getMovies();
  }, []);

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
          window.location.reload(false);
        }}
      >
        <form>
          <input type="search" className="search-box" placeholder="Search" />
        </form>
      </ListHeader>
      <div className="movie-cards">
        {movieData.map((e) => (
          <MovieCard
            key={e.id}
            id={e.id}
            title={e.title}
            overview={e.overview}
            rating={e.vote_average}
            image={e.poster_path}
          />
        ))}
      </div>
    </>
  );
};

export default List;
