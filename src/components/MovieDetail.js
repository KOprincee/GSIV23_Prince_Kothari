import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/spinner";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { movieId } = useParams();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
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
        setMovie(movieData);
        setIsLoading(false);
      });
  }, [movieId]);

  console.log(movie);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="movie-detail">
          {movie.poster_path ? (
            <div
              className="movie-poster"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`,
              }}
            ></div>
          ) : (
            <div className="movie-poster">No Image Available</div>
          )}

          <div className="movie-info">
            <div className="movie-header">
              <span className="detail-title">{movie.title} </span>
              <span className="detail-rating">{movie.vote_average}</span>
            </div>
            <div className="detail-year-len-dir">
              {movie.release_date.split("-")[0]} | {movie.runtime} Min |{" "}
              {movie.credits.crew.find((e) => e.job === "Director").name}
            </div>
            <div className="detail-cast">
              <b>Cast:</b>{" "}
              {movie.credits.cast.map((e) => e.original_name).join(", ")}
            </div>
            <div className="detail-description">
              <b> Description: </b>
              {movie.overview}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
