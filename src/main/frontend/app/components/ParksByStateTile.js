import React from "react"
import { Link } from "react-router-dom";
import { EqualHeightElement } from 'react-equal-height';


const ParksByStateTile = (props) =>{
  const { id, name, description, state, image, exceptionName } = props.park
  const path = `/parks/${state.name}/${id}`
    return(
      <div className={`columns medium-4 ${props.lastColumn}`}>
        <div className="card-park">
          <EqualHeightElement name="card">
            <div className="card-park-header">
              <img src={image} alt={name}/>
              <p className={`status-title ${props.parkStatusClass}`}>{props.parkStatus}</p>
            </div>
            <div className="card-park-body">
              <EqualHeightElement name="name">
                <h2 className="card-park-title"><Link to={path}>{name}</Link></h2>
              </EqualHeightElement>
            </div>
            <div className="card-park-footer">
              <Link to={path} className="button">More Info</Link>
            </div>
          </EqualHeightElement>
        </div>
      </div>
    )
}

export default ParksByStateTile;
