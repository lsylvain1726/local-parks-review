import React from "react";
import { Link } from "react-router-dom";
import { EqualHeightElement } from 'react-equal-height';


const ParkList = (props) => {
  const { id, name, state, image } = props.data
  return (
    <div className="small-12 medium-4 columns">
      <div className="card-park">
        <EqualHeightElement name="card">
          <div className="card-park-header">
            <img src={image} alt={name}/>
            <p className={`status-title ${props.parkStatusClass}`}>{props.parkStatus}</p>
          </div>
          <div className="card-park-body">
            <h2 className="card-all-parks-title">{name}</h2>
            <p>{state.name}</p>
          </div>
          <div className="card-park-footer">
            <Link to={`/parks/${state.name}/${id}`} className="button">
              More info
            </Link>
          </div>
        </EqualHeightElement>
      </div>
    </div>
  );
};
export default ParkList;
