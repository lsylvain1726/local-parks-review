import React, {useState, useEffect, Fragment} from "react"
import ErrorList from "./ErrorList"
import _ from 'lodash'


const EditReviewForm = (props) => {
    const [review, setReview] = useState(props.review)
    const [errors, setErrors] = useState({})

    const defaultReview = {
      comment: "",
      rating: ""
    }

    const validForSubmission = () => {
      let submitErrors = {}
      const requiredFields = ["comment", "rating"]
      requiredFields.forEach((field) => {
        if (review[field] === "") {
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
        id: props.id,
        comment: review.comment,
        rating: ratingNumber,
        park: props.review.park
      }

      if (validForSubmission()) {
        fetch(`/api/v1/review/edit/${formPayload.id}`, {
          credentials: "same-origin",
          method: "PUT",
          body: JSON.stringify(formPayload),
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
              props.newReview2();
            })
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


  if(props.edit){
    return(
         <Fragment>
            <div className="wrapper-review-form">
              <div className="row">
              <form onSubmit={handleReviewSubmit}>
                <ErrorList errors={errors} />
                <div className="small-12 medium-6 columns">
                  <label htmlFor="comment">Comment</label>
                  <input type="text" name="comment" id="comment" onChange={handleReviewChange} value={review.comment}  />
                </div>
                <div className="small-12 medium-6 columns">
                    <label htmlFor="rating">Rating</label>
                    <select name="rating" id="rating" onChange={handleReviewChange} value={review.rating} >
                          {ratingOptions}
                    </select>
                  </div>
                <div className="small-12 columns">
                  <input type="submit" className="button button-submit" value="Update Review" />
                </div>
              </form>
              </div>
            </div>
          </Fragment>
        )
  } else {
    return("")
  }
}


export default EditReviewForm