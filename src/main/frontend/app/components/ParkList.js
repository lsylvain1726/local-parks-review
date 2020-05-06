import React from "react";
import { Link } from "react-router-dom";


const ParkList = (props) => {
  const { id, name, state } = props.data
  return (
    <div className="small-12 medium-4 columns">
      <div className="card-all-parks">
        <h2 className="card-all-parks-title">{name}</h2>
        <p>{state.name}</p>
        <Link to={`/parks/${state.name}/${id}`}>
          More info
        </Link>
      </div>
    </div>
  );
};
export default ParkList;
