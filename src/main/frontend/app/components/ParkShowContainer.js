import React, { useState, useEffect } from "react"
import ParkShow from "./ParkShow"

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
    <div>
        <ParkShow key={park.id} data={park}/>
    </div>
  )
}

export default ParkShowContainer
