import React, { useState, useEffect } from 'react'

const Search = (props) => {
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
    const results = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  console.log(searchResults)

  return(
    <div className="search-bar">
      <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {searchResults.map(item => (
            <li>{item}</li>
          ))}
        </ul>
    </div>
  )

}

export default Search