import React, {Fragment} from 'react'
import { Route, BrowserRouter } from "react-router-dom"
import NavBar from "./NavBar"

const App = (props) => {
  return (
    <Fragment>
      <BrowserRouter>
        <Route path="/" component={NavBar} />
      </BrowserRouter>
    </Fragment>
  )
}

export default App