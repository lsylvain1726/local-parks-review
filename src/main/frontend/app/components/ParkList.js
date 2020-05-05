import React from "react";
const ParkList = (props) => {
  const { id, name, description, state } = props.data;
  return (
    <div>
      <h1>{name}</h1>
      <p>{state.name}</p>
    </div>
  );
};
export default ParkList;
