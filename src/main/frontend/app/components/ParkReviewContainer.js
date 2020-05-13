import React, {useState, useEffect, Fragment} from "react"
import ReviewFormContainer from "./ReviewFormContainer"
import ReviewShow from "./ReviewShow"

const ParkReviewContainer = (props) => {

  const [listReviews, setListReviews] = useState([])

  const addReview = formPayload => {
    fetch(`/api/v1/review`, {
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(resp => {
      return resp.json()
    })
    .then(json => {
      setListReviews([
        ...listReviews,
        json
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const loadReviews = () => {
    fetch(`/api/v1/review`)
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
        setListReviews(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(loadReviews, [])

  const reviewListItems = listReviews.map(review => {
    if(props.park.id === review.park.id) {
      return(
        <ReviewShow
          key={review.id} 
          review={review}
        />
      )
    }
  })

  return (
    <Fragment>
      <ReviewFormContainer 
        addReview={addReview}
        park={props.park}  
      />
      {reviewListItems}
    </Fragment>
  )
}

export default ParkReviewContainer
