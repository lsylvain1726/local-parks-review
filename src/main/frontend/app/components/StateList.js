import React from "react";
import { Link } from "react-router-dom";

const StateList = (props) => {
    const state = props.data
    
    return(
      <div className="small-12 medium-4 columns" data-equalizer="foo">
        <div className="card-state"  data-equalizer-watch="foo"> 
          <div className="card-state-body">
            <img src={state.imagePath} alt={state.name}/>
            <h2><Link to={`/parks/${state.name}`}>{state.name}</Link></h2>
            <p className="button"><Link to={`/parks/${state.name}`}>View Parks</Link></p>
          </div>
        </div>
      </div>  
    );
};
export default StateList;