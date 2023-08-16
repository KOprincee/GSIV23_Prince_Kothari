import { useNavigate } from "react-router-dom";
import ListHeader from "../components/ListHeader";

const Detail = () => {
  const navigate = useNavigate();
  return (
    <ListHeader
      clickEvent={() => {
        navigate("/");
      }}
    />
  );
};

export default Detail;
