import React from "react"
import { Link } from "react-router-dom";


const ParksByStateTile = (props) =>{
  const path = `/parks/${props.state}/${props.id}`
    return(
      <div className="small-12 medium-4 columns">
        <div className="card-park">
          <div className="card-park-body">
            <h3><Link to={path}>{props.name}</Link></h3>
            <p>{props.description}</p>
          </div>
          <div className="card-pet-footer">
          <Link to={path} className="button button-pettype-name">Visit {props.name}</Link>
          </div>
        </div>
      </div>
    )
}

export default ParksByStateTile;