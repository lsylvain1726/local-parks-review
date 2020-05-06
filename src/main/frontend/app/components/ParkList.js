import React from "react";
import { Link } from "react-router-dom";


const ParkList = (props) => {
  const { id, name, state } = props.data
  return (
    <div>
      <h1>{name}</h1>
      <p>{state.name}</p>
        <Link to={`/${state.name}/${id}`}>
          More info
        </Link>
    </div>
  );
};
export default ParkList;
