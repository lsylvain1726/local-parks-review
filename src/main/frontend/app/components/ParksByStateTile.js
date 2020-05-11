import React from "react"
import { Link } from "react-router-dom";


const ParksByStateTile = (props) =>{
  const { id, name, description, state, image } = props.park
  const path = `/parks/${state.name}/${id}`
    return(
      <div className="small-12 medium-4 columns">
        <div className="card-park">
          <div className="card-park-body">
            <img src={image} alt={name}/>
            <h3><Link to={path}>{name}</Link></h3>
            <p>{description}</p>
          </div>
          <div className="card-pet-footer">
          <Link to={path} className="button button-pettype-name">Visit</Link>
          </div>
        </div>
      </div>
    )
}

export default ParksByStateTile;