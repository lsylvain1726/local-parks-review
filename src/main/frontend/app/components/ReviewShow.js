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
    <div>
      <p>
        {review.comment}<br />
        {review.rating}
      </p>
      <div>
        <button onClick={props.editReview}>Edit</button>
        <button onClick={props.deleteReview}>Delete</button>
      </div>
    </div>
  )
}

export default ReviewShow