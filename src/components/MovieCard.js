import "./MovieCard.css";

const MovieCard = () => {
  return (
    <div className="movie-card">
      <div className="image-section"></div>
      <div className="movie-data">
        <div className="row-one">
          <div className="movie-title">John Wick</div>
          <div className="movie-rating">4.8</div>
        </div>
        <div className="row-two">
          <div className="movie-desc">asv</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
