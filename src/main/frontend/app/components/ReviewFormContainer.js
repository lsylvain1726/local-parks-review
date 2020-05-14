import React, {useState, useEffect, Fragment} from 'react'
import ErrorList from "./ErrorList"
import _ from 'lodash'


const ReviewFormContainer = (props) => {

    const defaultReview = {
      comment: "",
      rating: ""
    }
    const [review, setReview] = useState(defaultReview)
    const [errors, setErrors] = useState({})


    const validForSubmission = () => {
      let submitErrors = {}
      const requiredFields = ["comment", "rating"]
      requiredFields.forEach((field) => {
        if (review[field].trim() === "") {
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
      setReview({
        ...review,
        [event.currentTarget.id]: event.currentTarget.value
      })
    }

    const handleReviewSubmit = event => {
      event.preventDefault()

      let ratingNumber = parseInt(review.rating)

      let formPayload = {
        comment: review.comment,
        rating: ratingNumber,
        park: props.park,
      }

      if (validForSubmission()) {
        props.addReview(formPayload)
        setReview(defaultReview)
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
          <div className="small-12 columns">
            <label htmlFor="comment">Comment</label>
            <textarea name="comment" id="comment" onChange={handleReviewChange} value={review.comment}  cols="40" rows="5"></textarea>
          </div>
          <div className="small-12 columns">
              <label htmlFor="rating">Rating</label>
              <select name="rating" id="rating" onChange={handleReviewChange} value={review.rating} >
                    {ratingOptions}
              </select>
            </div>
          <div className="small-12 columns">
            <input type="submit" className="button button-submit" value="Leave A Review!" />
          </div>
        </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ReviewFormContainer