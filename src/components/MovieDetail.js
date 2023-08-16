import "./MovieDetail.css";

const MovieDetail = () => {
  return (
    <div className="movie-detail">
      <div className="movie-poster">No Image available</div>
      <div className="movie-info">
        <div className="movie-header">
          <span className="detail-title">Shawshank </span>
          <span className="detail-rating">4.5</span>
        </div>
        <div className="detail-year-len-dir">Year | Length | Director</div>
        <div className="detail-cast">Cast: Actor 1, Actor 2, Actor 3</div>
        <div className="detail-description">Description: Lorem Ipsum</div>
      </div>
    </div>
  );
};

export default MovieDetail;
