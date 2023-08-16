import React, { useCallback, useEffect, useState } from "react";
import ListHeader from "../components/ListHeader";
import MovieCard from "../components/MovieCard";
import "./List.css";
import Spinner from "../spinner/spinner";

const List = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchpage, setSearchPage] = useState(1);

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
    console.log("check");
    getMovies();
  }, [isLoading, getMovies]);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const searchMovie = async (e) => {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&page=${searchpage}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJjMGM5OTY5YWRkNDg4Zjc3YTNiMGIxODMyNTQ1MiIsInN1YiI6IjY0ZGE0YjBhMzcxMDk3MDBhYzQyNjNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EpCzZ3TglQW4v3fcJkv31NF5cjiNdkaRb2np8bgn3Lg",
        },
      }
    )
      .then((response) => response.json())
      .then((movieData) => {
        setMovieData(movieData.results);
        console.log(movieData);
      });

    if (e.target.value.length === 0) {
      setPage(2);
      setIsLoading(true);
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=1`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJjMGM5OTY5YWRkNDg4Zjc3YTNiMGIxODMyNTQ1MiIsInN1YiI6IjY0ZGE0YjBhMzcxMDk3MDBhYzQyNjNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EpCzZ3TglQW4v3fcJkv31NF5cjiNdkaRb2np8bgn3Lg",
        },
      })
        .then((response) => response.json())
        .then((movieData) => {
          setMovieData(movieData.results);
          setIsLoading(false);
        });
    }
  };

  console.log(movieData.length);

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
          <input
            type="search"
            className="search-box"
            placeholder="Search"
            onChange={searchMovie}
          />
        </form>
      </ListHeader>
      {movieData.length === 0 && !isLoading ? (
        <div className="search-error">
          <h1>No movie found 💔. Check your spelling 🤦‍♂️ and try again.</h1>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default List;
