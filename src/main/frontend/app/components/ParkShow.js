import React from "react"
import ParkReviewContainer from "./ParkReviewContainer"

const ParkShow = (props) => {
  const { name, description, state, image, directionsUrl, hoursDescription, exceptionEndDate} = props.data
  if (props.data.name) {
    return (
      <div className="row">
        <div className="columns small-8">
          <div className="card-park-info-left">
            <img src={image} alt={name}/>
            <p>{description}</p>
          </div>
          <ParkReviewContainer 
            park={props.data}
          />
        </div>
        <div className="columns small-4">
          <div className="card-park-info-right">
            <h3 className="card-park-info-title">Important Park Info</h3>
            <ul className="list-park-info">
              <li><span className="list-title">State:</span> {state.name}</li>
              <li><span className="list-title">Status:</span> {props.parkStatus}</li>
              <li className={props.exceptionDateHide}><span className="list-title">Expected Reopening Date:</span> {exceptionEndDate}</li>
              <li><span className="list-title">Hours:</span> {hoursDescription}</li>
              <li><a href={directionsUrl} className="list-directions" target='_blank'>Directions</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
      return ""
  }
}

export default ParkShow
