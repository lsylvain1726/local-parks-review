import React from "react"

const ParksByStateTile = (props) =>{

    return(
        <div>
            <h3>{props.name}</h3>
            <p>{props.operatingHours}</p>
            <p>{props.operatingHoursDescription}</p>
            <p>{props.exceptionHours}</p>
            <p>{props.exceptionHoursDescription}</p>
            <p>{props.exceptionHoursStartDate}</p>
            <p>{props.exceptionHoursEndDate}</p>
            <p><image src="{props.imgUrl}" /></p>
        </div>
    )
}

export default ParksByStateTile;