import React from "react"
import ReviewFormContainer from "./ReviewFormContainer"

const ParkShow = (props) => {
  const { name, description, state } = props.data
  if (props.data.name) {
    return (
      <div className="row">
        <div className="columns small-12">
          <div className="card-park-info">
            <h2>{state.name}</h2>
            <p>{description}</p>
            <ReviewFormContainer />
          </div>
        </div>
      </div>
    )
  } else {
      return ""
  }
}

export default ParkShow
