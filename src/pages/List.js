import React, { useEffect, useState } from "react";
import ListHeader from "../components/ListHeader";
import MovieCard from "../components/MovieCard";
import "./List.css";

const List = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_date.gte=2023-08-14&primary_release_date.lte=2023-09-14&sort_by=primary_release_date.asc`,
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
      });
  }, []);

  return (
    <>
      <ListHeader />
      <div className="movie-cards">
        {movieData.map((e) => (
          <MovieCard
            title={e.original_title}
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
