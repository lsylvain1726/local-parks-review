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
    </div>
  )
}

export default ReviewShow