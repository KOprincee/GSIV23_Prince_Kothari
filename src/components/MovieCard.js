import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card" onClick={() => navigate(`/${props.id}`)}>
      {props.image ? (
        <div
          className="image-section"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w500/${props.image}")`,
          }}
        ></div>
      ) : (
        <div className="image-section">No Image Available</div>
      )}
      <div className="movie-data">
        <div className="row-one">
          <div className="movie-title">{props.title}</div>
          <div className="movie-rating">{props.rating}</div>
        </div>
        <div className="row-two">
          {!props.overview ? (
            <div className="movie-desc">No overview available</div>
          ) : (
            <div className="movie-desc">{props.overview}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
