import React, { useState, useEffect, Fragment } from "react";
import ParksByStateTile from "./ParksByStateTile";

const ParksByStateContainer = props => {
    const [parks, setParks] = useState([]);

    let state = props.match.params.state;

    let stateNoSpace = state.replace(/\s+/g, '')

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
            .catch(error => {
                error => console.error(`Error in fetch: ${error.message}`)
            })
    })

    const mapParks = parks.map(park => {
        return (
            <ParksByStateTile
                key={park.id}
                id={park.id}
                name={park.name}
                description={park.description}
                state={state}
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
            {mapParks}
          </div>
        </div>
      </Fragment>
    );
};

export default ParksByStateContainer;
