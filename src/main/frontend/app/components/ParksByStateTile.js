import React from "react"
import { Link } from "react-router-dom";


const ParksByStateTile = (props) =>{
  const path = `/parks/${props.state}/${props.id}`
    return(
        <div>
            <h3><Link to={path}>{props.name}</Link></h3>
            <p>{props.description}</p>
        </div>
    )
}

export default ParksByStateTile;