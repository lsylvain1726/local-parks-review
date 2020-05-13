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
    props.deleteContractor(props.id)
  }

  return(
    <div>
      <p>
        {review.comment}<br />
        {review.rating}
      </p>
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={props.deleteReview}>Delete</button>
      </div>
        <EditReviewForm
          key={review.id}
          edit={updateReview}
          review={props.review}
        />
    </div>
  )
}

export default ReviewShow