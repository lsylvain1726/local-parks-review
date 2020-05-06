import React from "react"

const ParksByStateTile = (props) =>{

    return(
        <div>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
        </div>
    )
}

export default ParksByStateTile;