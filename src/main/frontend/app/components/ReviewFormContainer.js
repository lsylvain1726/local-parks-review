import React, {useState, useEffect, Fragment} from 'react'
import ErrorList from "./ErrorList"
import _ from 'lodash'
import ReviewShow from './ReviewShow'

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

    const [listReviews, setListReviews] = useState([])
    useEffect(() => {
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
    }, [])

    const listReviewsByState = listReviews.map((review) => {
      if(props.park.id === review.park.id) {
        return(
          <ReviewShow
            key={review.id} 
            review={review}
          />
        )
      }
    })

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

  return(
    <Fragment>
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
      {reviewSubmitted.comment}
      {listReviewsByState}
    </Fragment>
  )
}

export default ReviewFormContainer