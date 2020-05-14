import React, { useEffect, useState, Fragment } from "react";
import StateList from "./StateList"
import HeroHeader from "./HeroHeader"
import SearchContainer from "./SearchContainer"


const StateContainer = (props) => {
    const [states, setStates] = useState([]);
    useEffect(() => {
        fetch("api/v1/states")
        .then((response)=>{
            if(response.ok) {
                return response;
            } else {
                let errorMessage = `${response.status} (${response.statusText})`,
                error= new Error(errorMessage);
                throw error;
            }
        })
        .then((response)=>response.json())
        .then((data) => {
            setStates(data);
        })
        .catch((error)=> {
            error.text().then((errorMessage) => {
                this.props.dispatch(displayError(errorMessage)); 
            });
        });
    }, []);

    const listOfStates = states.map(state => {
        return <StateList key={state.id} data={state}/>
    })

    return (
      <Fragment>
        <HeroHeader />
        <div className="wrapper-state">
          <div className="row">
            <div className="small-12 columns">
              <div className="wrapper-state-header">
                <h2 className="wrapper-state-title">Choose A State</h2>
                <span><img src="https://local-parks.s3.us-east-2.amazonaws.com/tree-icon.png" alt="Logo Icon" /></span>
              </div>
            </div>
              {listOfStates}
          </div>
          <SearchContainer />
        </div>
      </Fragment>
    );
};

export default StateContainer