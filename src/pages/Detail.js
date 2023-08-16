import { useNavigate } from "react-router-dom";
import ListHeader from "../components/ListHeader";
import MovieDetail from "../components/MovieDetail";

const Detail = () => {
  const navigate = useNavigate();
  return (
    <>
      <ListHeader
        childClass="detail-div"
        clickEvent={() => {
          navigate("/");
        }}
      >
        Movie Detail
      </ListHeader>
      <MovieDetail />
    </>
  );
};

export default Detail;
