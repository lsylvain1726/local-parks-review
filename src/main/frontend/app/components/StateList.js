import React from "react";
const StateList = (props) => {
    const{id, name, state} = props.data;

    return(
        <div>
            <h1>{state.name}</h1>
            <img src="https://vacationidea.com/pix/img25Hy8R/articles/most-beautiful-mountains-of-vermont_t5.jpg" />
        </div>
    );
};
export default StateList;