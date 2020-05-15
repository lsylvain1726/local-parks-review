import React, { useState, useEffect } from 'react'
import ParkList from "./ParkList"

const Search = (props) => {
  const allParks = props.parks
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const people = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
  ];


  useEffect(() => {
    const results = allParks.filter(park => 
      park.state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(results)
    setSearchResults(results)
  }, [searchTerm]);
  //console.log(searchResults)

  // useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   console.log(results)
  //   setSearchResults(results);
  // }, [searchTerm]);

  return(
    <div className="search-bar">
      <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchResults.map(park => {
          return <ParkList key={park.id} data={park}/>
        })}

        {/* <ul>
          {searchResults.map(item => (
            <li>{item}</li>
          ))}
        </ul> */}
    </div>
  )

}

export default Search