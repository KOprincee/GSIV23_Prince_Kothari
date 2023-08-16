import "./ListHeader.css";
import home from "../assets/home_black_24dp.svg";

const ListHeader = (props) => {
  return (
    <div className="list-header">
      <div className={props.childClass}>{props.children}</div>
      <div className="home-div" onClick={props.clickEvent}>
        <img src={home} alt="home"></img>
      </div>
    </div>
  );
};

export default ListHeader;
