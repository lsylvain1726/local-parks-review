import React from "react"
import { Link } from "react-router-dom";


const ParksByStateTile = (props) =>{
  const { id, name, description, state, image, exceptionName } = props.park
  const path = `/parks/${state.name}/${id}`
    return(
        <div className="columns medium-4">
          <div className="card-park" data-equalizer-watch="about">
            <div className="card-park-header">
              <img src={image} alt={name}/>
              <p className={`status-title ${props.parkStatusClass}`}>{props.parkStatus}</p>
            </div>
            <div className="card-park-body">
              <h2 className="card-park-title"><Link to={path}>{name}</Link></h2>
            </div>
            <div className="card-pet-footer">
            <Link to={path} className="button button-pettype-name">More Info</Link>
            </div>
          </div>
        </div>
    )
}

export default ParksByStateTile;