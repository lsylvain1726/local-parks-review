import React, {useState, useEffect} from 'react'
import ErrorList from "./ErrorList"
import _ from 'lodash'
import ReviewUpdateTile from "./ReviewUpdateTile"

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
      comment: "",
      rating: ""
    }

    const [reviewSubmitted, setReviewSubmitted] = useState(defaultReview)
    const [errors, setErrors] = useState({})

    const validForSubmission = () => {
      let submitErrors = {}
      const requiredFields = ["comment", "rating"]
      requiredFields.forEach((field) => {
        if (reviewSubmitted[field].trim() === "") {
          submitErrors = {
            ...submitErrors,
            [field]: "is blank"
          }
        }
      })
    
      setErrors(submitErrors)
      return _.isEmpty(submitErrors)
    }

    const handleReviewChange = event => {
      event.preventDefault()
      setReviewSubmitted({
        ...reviewSubmitted,
        [event.currentTarget.id]: event.currentTarget.value
      })
    }

    const handleReviewSubmit = event => {
      event.preventDefault()

      let ratingNumber = parseInt(reviewSubmitted.rating)

      let formPayload = {
        comment: reviewSubmitted.comment,
        rating: ratingNumber,
        park: props.park,
      }

      if (validForSubmission()) {
        addReview(formPayload)
        setReviewSubmitted(defaultReview)
      }
    }

    const allRatings = ["1", "2", "3", "4", "5"]
    const ratingOptions = [""].concat(allRatings).map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    )
  })

  const reviewListItems = reviewSubmitted.map(review=> {
    return(
      <ReviewUpdateTile
        key={review.id}
        visitor={review.visitor}
        comment={review.comment}
        rating={review.rating}
      />
    )
  })

  const deleteReview = (Review) => {
    fetch(`api/v1/review/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(Review),
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
          setReviewSubmitted([...reviewSubmitted,
            json
          ])
        })
  }

  const editContractor = (reviewSubmitted) => {
      fetch(`/api/v1/review/${id}`)
      .then((resp) => {
        if (resp.ok){
          return resp
        }else{
          throw new Error(resp.Error)
        }
        }).then(resp => {
          return resp.json();
        }).then(body => {
          setUpdatedContractor({...body})
          setLoading(false)
        })
    }


  return(
    <div>
      <div>
        {reviewListItems}
      </div>
      <div className="wrapper-review-form">
        <div className="row">
        <form onSubmit={handleReviewSubmit}>
          <ErrorList errors={errors} />
          <div className="small-12 medium-6 columns">
            <label htmlFor="comment">Comment</label>
            <input type="text" name="comment" id="comment" onChange={handleReviewChange} value={reviewSubmitted.comment}  />
          </div>
          <div className="small-12 medium-6 columns">
              <label htmlFor="rating">Rating</label>
              <select name="rating" id="rating" onChange={handleReviewChange} value={reviewSubmitted.rating} >
                    {ratingOptions}
              </select>
            </div>
          <div className="small-12 columns">
            <input type="submit" className="button button-submit" value="Leave A Review!" />
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewFormContainer