import React, {Fragment} from 'react'
import { Route, BrowserRouter } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import SearchBar from "./SearchBar"

const App = (props) => {
  return (
    // <Fragment>
    //   <BrowserRouter>
    //     <Route path="/" component={NavBar} />
    //   </BrowserRouter>
    //   <Footer />
    // </Fragment>
    <SearchBar />
  )
}

export default App