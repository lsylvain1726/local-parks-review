import React, { useState, useEffect } from "react";
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
        <div>
            <h2>Find A Park In {state}!</h2>
            <div>
                {mapParks}
            </div>
        </div>
    );
};

export default ParksByStateContainer;
