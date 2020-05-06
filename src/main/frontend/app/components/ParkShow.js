import React from "react"
import ReviewFormContainer from "./ReviewFormContainer"

const ParkShow = (props) => {
  const { name, description, state } = props.data
  if (props.data.name) {
    return (
      <div>
        <h1>{name}</h1>
        <h2>{state.name}</h2>
        <p>{description}</p>
        <ReviewFormContainer />
      </div>
    )
  } else {
      return ""
  }
}

export default ParkShow
