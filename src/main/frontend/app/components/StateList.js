import React from "react";

const StateList = (props) => {
    const state = props.data

    return(
      <div className="small-12 medium-4 columns">
        <div className="card-state">
          <div className="card-state-body">
            <h2>{state.name}</h2>
            <img src="https://vacationidea.com/pix/img25Hy8R/articles/most-beautiful-mountains-of-vermont_t5.jpg" />
          </div>
        </div>
      </div>  
    );
};
export default StateList;