import React from "react"
import { Link } from "react-router-dom";

const ReviewSlide = (props) => {
  return (
    <div className="item-slider">
      <p>{props.review.comment}</p>
      <a className="home-review-link" href={`/parks/${props.review.park.state.name}/${props.review.park.state.id}`}>{props.review.park.name}</a>
    </div>
  )
}

export default ReviewSlide