import React, { useState, useEffect } from 'react'
import ParkList from "./ParkList"
import { EqualHeight } from 'react-equal-height';

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

  const listSearchResults = searchResults.map(park => {
    return (
      <ParkList key={park.id} data={park}/>
    )
  })

  return(
    <div className="search-bar">
      <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="test">
        <EqualHeight>
          {listSearchResults}
        </EqualHeight>
        </div>

        {/* <ul>
          {searchResults.map(item => (
            <li>{item}</li>
          ))}
        </ul> */}
    </div>
  )

}

export default Search