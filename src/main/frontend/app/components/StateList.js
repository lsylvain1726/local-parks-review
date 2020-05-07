import React from "react";
import { Link } from "react-router-dom";

const StateList = (props) => {
    const state = props.data
    const path = "/parks/" + state.name;

    return(
      <div className="small-12 medium-4 columns">
        <div className="card-state">
          <div className="card-state-body">
            <h2><Link to={path}>{state.name}</Link></h2>
            <img src="https://vacationidea.com/pix/img25Hy8R/articles/most-beautiful-mountains-of-vermont_t5.jpg" />
          </div>
        </div>
      </div>  
    );
};
export default StateList;