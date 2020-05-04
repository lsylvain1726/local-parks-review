import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

const App = props => {
  return <h1>Hello from React</h1>;
};

ReactDom.render(<App />, document.getElementById("app"));
