import React, { useState, useEffect } from "react";
import ParksByStateTile from "./ParksByStateTile";

const ParksByStateContainer = props => {
    const [parks, setParks] = useState([]);
    const state = props.match.params.type;
    useEffect(() => {
        fetch(`/api/v1/states/${state}`)
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
    }, [])

    const mapParks = parks.map(park => {
        return (
            <ParksByStateTile
                key={park.id}
                imgUrl={park.images[0].url}
                name={park.fullName}
                operatingHours={park.operatingHours[0].standardHours}
                operatingHoursDescription={park.operatingHours[0].description}
                exceptionHours={park.operatingHours[0].exceptions.exceptionHours}
                exceptionHoursDescription={park.operatingHours[0].exceptions[0].name}
                exceptionHoursStartDate={park.operatingHours[0].exceptions[0].startDate}
                exceptionHoursEndDate={park.operatingHours[0].exceptions[0].endDate}
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
