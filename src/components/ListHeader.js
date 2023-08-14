import "./ListHeader.css";
import home from "../assets/home_black_24dp.svg";

const ListHeader = () => {
  return (
    <div className="list-header">
      <div className="search-div">
        <form>
          <input type="search" className="search-box" placeholder="Search" />
        </form>
      </div>
      <div className="home-div">
        <img src={home} alt="home"></img>
      </div>
    </div>
  );
};

export default ListHeader;
