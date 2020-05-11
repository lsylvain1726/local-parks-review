import React, {useState} from 'react'

const ReviewUpdateTile = (props) => {
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
    </div>
  )
}

export default ReviewUpdateTile;