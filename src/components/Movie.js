import { useSelector } from "react-redux";

import MovieCard from "./MovieCard";

const Movie = () => {
  const movieList = useSelector((state) => state.movie.movieList);
  return (
    movieList &&
    movieList.map((e) => (
      <MovieCard
        key={e.id}
        id={e.id}
        title={e.title}
        overview={e.overview}
        rating={e.vote_average}
        image={e.poster_path}
      />
    ))
  );
};

export default Movie;
