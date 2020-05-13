import React, { useState, useEffect, Fragment } from "react"
import ParkShow from "./ParkShow"
import ReviewFormContainer from "./ReviewFormContainer"
import ReviewShow from "./ReviewShow"
import ParkReviewContainer from "./ParkReviewContainer"

const ParkShowContainer = (props) => {
  const { state, id } = props.match.params
  const [park, setPark] = useState({})

  useEffect(() => {
    fetch(`/api/v1/parks/${state}/${id}`)
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
          throw error
        }
      })
      .then((result) => {
        return result.json()
      })
      .then((json) => {
        setPark(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, {})

  return (
    <Fragment>
      <div className={`wrapper-interior-header wrapper-interior-park`}>
        <div className="row">
          <div className="small-12 columns">
            <h1 className="park-header-title">{park.name}</h1>
          </div>
        </div>
      </div>
      <div className="wrapper-individual-pet">
        <ParkShow key={park.id} data={park}/>
        <ParkReviewContainer 
          park={park}
        />
      </div>
    </Fragment>
  )
}

export default ParkShowContainer
