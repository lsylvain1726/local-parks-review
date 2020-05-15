import React, {useState, useEffect, Fragment} from "react"
import ReviewFormContainer from "./ReviewFormContainer"
import ReviewShow from "./ReviewShow"


const ParkReviewContainer = (props) => {

  const [listReviews, setListReviews] = useState([])
  const [reviewUpdated, setReviewUpdated] = useState(false)

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
  debugger
    fetch(`api/v1/review/delete/${reviewSubmitted}`, {
        credentials: 'same-origin',
        method: 'DELETE',
        body: JSON.stringify(listReviews),
        headers: {'Content-Type': 'application/json'}
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
        setListReviews([...listReviews,
          json
        ])
      })

}

const editReview = (listReviews) => {
    fetch(`/api/v1/review/edit/${listReviews.id}`, {
      method: "PUT",
      body: JSON.stringify(listReviews),
      headers: { "Content-Type": "application/json" }
    })
    .then((resp) => {
      if (resp.ok){
        return resp
      } else{
        throw new Error(resp.Error)
      }
      }).then(resp => {
        return resp.json();
      }).then(body => {
        setListReviews({...body})
        setLoading(false)
      })
  }

  const newReview = () =>{
    setReviewUpdated(!reviewUpdated)
  }

  const reviewListItems = listReviews.map((review) => {

    let starClass = review.rating

    if(props.park.id === review.park.id) {
      return(
      <div>
        <ReviewShow
          key={review.id}
          id={review.id}
          review={review}
          starClass={starClass}
          deleteReview={deleteReview}
          newReview={newReview}
          loadReviews={loadReviews}
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
      <hr />
      <h2 className="review-header-title">What People Say About {props.park.name}</h2>
      {reviewListItems}
    </Fragment>
  )
}

export default ParkReviewContainer
