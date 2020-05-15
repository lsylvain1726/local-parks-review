import React, { useState, useEffect, Fragment } from 'react'
import ParkList from "./ParkList"
import { EqualHeight } from 'react-equal-height';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [parks, setParks] = useState([])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    fetch("api/v1/parks")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setParks(data);
        setSearchResults(data)
      })
      .catch((error) => {
        error.text().then((errorMessage) => {
          this.props.dispactch(displayError(errorMessage));
        });
      });
  }, []);

  useEffect(() => {
    const results = parks.filter(park => 
      park.state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results)
  }, [searchTerm]);

  const lastIndex = searchResults.length - 1
  const listSearchResults = searchResults.map((park, i) => {
    let parkStatus = ""
    let parkStatusClass = ""

    if(park.exceptionName != null) {
      parkStatus = park.exceptionName
      parkStatusClass = "closed"
    } else {
      parkStatus = "Open"
      parkStatusClass = "open"
    }

    let lastColumn = ""
    if (i === lastIndex) {
      lastColumn = "end"
    } else {
      lastColumn = "next"
    }

    return (
      <ParkList 
        key={park.id} 
        data={park}
        parkStatus={parkStatus}
        parkStatusClass={parkStatusClass}
        lastColumn={lastColumn}
      />
    )
  })

  return(
    <Fragment>
      <div className="search-bar">
        <h3 className="search-bar-title">Search By State</h3>
        <input
            type="text"
            placeholder="Search By State"
            value={searchTerm}
            onChange={handleSearchChange}
          />
      </div>
      <div className="search-results">
        <EqualHeight>
          {listSearchResults}
        </EqualHeight>
      </div>
    </Fragment>
  )

}

export default Search