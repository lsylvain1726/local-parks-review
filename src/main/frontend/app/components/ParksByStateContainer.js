import React, { useState, useEffect, Fragment } from "react";
import ParksByStateTile from "./ParksByStateTile";
import { EqualHeight } from 'react-equal-height';

const ParksByStateContainer = props => {
    const [parks, setParks] = useState([]);

    let state = props.match.params.state;

    useEffect(() => {
        fetch(`/api/v1/parks/${state}`)
            .then(response => {
                if (response.ok) {
                    return response
                } else {
                    let errorMessage = `${response.status} (${response.statusText})`,
                        error = new Error(errorMessage)
                    throw (error)
                }
            })
            .then(response => response.json())
            .then(body => {
                setParks(body)
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [state])

    const lastIndex = parks.length - 1
    const mapParks = parks.map((park, i) => {

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
            <ParksByStateTile
                key={park.id}
                park={park}
                lastColumn={lastColumn}
                parkStatus={parkStatus}
                parkStatusClass={parkStatusClass}
            />
        )
    });

    return (
      <Fragment>
        <div className={`wrapper-interior-header`}>
          <div className="row">
            <div className="small-12 columns">
              <h1 className="park-header-title">Find A Park In {state}</h1>
            </div>
          </div>
        </div>
        <div className="wrapper-park-by-state">
          <div className="row">
            <EqualHeight>
              {mapParks}
            </EqualHeight>
          </div>
        </div>
      </Fragment>
    );
};

export default ParksByStateContainer;
