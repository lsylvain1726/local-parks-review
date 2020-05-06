import React, {useState} from 'react'

const ReviewFormContainer = (props) => {
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
      .then(response => {
        response.json()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }


    const defaultReview = {
      comment: ""
    }

    const [reviewSubmitted, setReviewSubmitted] = useState(defaultReview)

    const handleReviewChange = event => {
      event.preventDefault()
      setReviewSubmitted({
        ...reviewSubmitted,
        [event.currentTarget.id]: event.currentTarget.value
      })
    }

    const handleReviewSubmit = event => {
      event.preventDefault()

      let formPayload = {
        comment: reviewSubmitted.comment,
        park: {id:1, name:"Appalachian National Scenic Trail, description=The Appalachian Trail is a 2,180+ mile long public footpath that traverses the scenic, wooded, pastoral, wild, and culturally resonant lands of the Appalachian Mountains. Conceived in 1921, built by private citizens, and completed in 1937, today the trail is managed by the National Park Service, US Forest Service, Appalachian Trail Conservancy, numerous state agencies and thousands of volunteers.", location:"Vermont", visitors:[{id:1, firstName:"Juvenal", lastName:"Miranda", parkReviews:[]}]},
        visitor: {id:1, firstName:"Juvenal", lastName:"Miranda", parkReviews:[]}
      }

      addReview(formPayload)
    }

  return(
    <div className="wrapper-review-form">
      <div className="row">
      <form onSubmit={handleReviewSubmit}>
        <div className="small-12 medium-6 columns">
          <label htmlFor="comment">Comment</label>
          <input type="text" name="comment" id="comment" onChange={handleReviewChange} value={reviewSubmitted.comment}  />
        </div>
        <div className="small-12 columns">
          <input type="submit" className="button button-submit" value="Leave A Review!" />
        </div>
      </form>
      </div>
    </div>
  )
}

export default ReviewFormContainer