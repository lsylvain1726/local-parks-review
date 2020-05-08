import React from "react"
import { Link } from "react-router-dom";


const ParksByStateTile = (props) =>{
  const { id, name, description, state } = props.park
  const path = `/parks/${state.name}/${id}`
    return(
      <div className="small-12 medium-4 columns">
        <div className="card-park">
          <div className="card-park-body">
            <h3><Link to={path}>{name}</Link></h3>
            <p>{description}</p>
          </div>
          <div className="card-pet-footer">
          <Link to={path} className="button button-pettype-name">Visit {state.name}</Link>
          </div>
        </div>
      </div>
    )
}

export default ParksByStateTile;