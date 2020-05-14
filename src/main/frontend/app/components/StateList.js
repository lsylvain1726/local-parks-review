import React from "react";
import { Link } from "react-router-dom";

const StateList = (props) => {
    const state = props.data
    
    return(
      <div className="small-12 medium-4 columns">
        <div className="card-state"> 
          <div className="card-state-body">
            <img src={state.imagePath} alt={state.name}/>
            <h2 className="card-state-title"><Link to={`/parks/${state.name}`}>{state.name}</Link></h2>
            <Link to={`/parks/${state.name}`} className="button">View Parks</Link>
          </div>
        </div>
      </div>  
    );
};
export default StateList;