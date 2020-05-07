import React from "react";
import { Link } from "react-router-dom";


const ParkList = (props) => {
  const { id, name, state } = props.data
  return (
    <div className="small-12 medium-4 columns">
      <div className="card-park">
        <div className="card-park-body">
          <h2 className="card-all-parks-title">{name}</h2>
          <p>{state.name}</p>
        </div>
        <div className="card-park-footer">
          <Link to={`/parks/${state.name}/${id}`}>
            More info
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ParkList;
