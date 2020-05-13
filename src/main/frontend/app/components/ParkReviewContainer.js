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

  const deleteReview = (reviewSubmitted) => {
    fetch(`api/v1/review/${id}`, {
        credentials: 'same-origin',
        method: 'DELETE',
        body: JSON.stringify(contractor),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
          throw (error)
        }
      })
      .then(response => response.json())
      .then(json => {
        setLoading(false)
        setContractors([...contractors,
          json
        ])
      })

}

  const reviewListItems = listReviews.map(review => {
    if(props.park.id === review.park.id) {
      return(
      <div>
        <ReviewShow
          key={review.id}
          id={review.id}
          review={review}
          deleteReview={deleteReview}
        />
      </div>
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
