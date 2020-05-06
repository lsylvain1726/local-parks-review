import React, { useState, useEffect } from "react"
import ListPage from "../components/ListPage"

const ListContainer = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    fetch("/api/v1/parks")
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
        setLists(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const listOfParks = lists.map((park) => {
    return <ListPage key={park.id} data={park} />
  })

  return <div>{listOfParks}</div>
}

export default ListContainer
