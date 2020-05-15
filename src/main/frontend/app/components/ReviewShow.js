import React, {useState, useEffect} from "react"
import EditReviewForm from "./EditReviewForm"

const ReviewShow = (props) => {
  const [updateReview, setUpdateReview] = useState(false)
  const review = props.review

  const handleEditClick = (event) => {
    setUpdateReview(true)
    event.preventDefault()
  }

  const addReview = (formPayLoad) => {
    event.preventDefault()
    props.editReview(formPayLoad)
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    props.deleteReview(props.id)
  }

  return(
    <div className="card-review">
      <div className="card-review-header">
        <div className="stars-outer">
          <div className={`stars-inner stars-inner-${props.starClass}`}>
          </div>
        </div>
      </div>
      <div className="card-review-body">
        <p>
          {review.comment}
        </p>
        <div>
          <button onClick={props.editReview}>Edit</button>
          <button onClick={props.deleteReview}>Delete</button>
        </div>
      </div>
        <EditReviewForm
          key={review.id}
          id={props.id}
          edit={updateReview}
          review={props.review}
        />
    </div>
  )
}

export default ReviewShow