import React from "react"

const ReviewShow = (props) => {
  const review = props.review

  const handleEditClick = (event) => {
    event.preventDefault()
    props.editContractor(props.id)
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    props.deleteContractor(props.id)
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
    </div>
  )
}

export default ReviewShow