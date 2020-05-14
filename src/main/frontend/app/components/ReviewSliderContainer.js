import React, {useState, useEffect} from "react"
import ReviewSlide from "./ReviewSlide"

const ReviewSliderContainer = (props) => {

  const [listReviews, setListReviews] = useState([])

  const loadReviews = () => {
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
  }
  useEffect(loadReviews, [])

  const allReviews = listReviews.map((review) => {
    return(
      <ReviewSlide
        key={review.id}
        review={review}
      />
    )
  })

  return (
    <div className="review-slider">
      {allReviews}
    </div>
  )
}

export default ReviewSliderContainer