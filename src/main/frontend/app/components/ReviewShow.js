import React from "react"

const ReviewShow = (props) => {
  const review = props.review
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