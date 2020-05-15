import React, { useEffect , useState, Fragment} from "react";
import ParkList from "../components/ParkList";
import { EqualHeight } from 'react-equal-height';
import SearchContainer from './SearchContainer'

const ParkContainer = (props) => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    fetch("api/v1/parks")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setParks(data);
      })
      .catch((error) => {
        error.text().then((errorMessage) => {
          this.props.dispactch(displayError(errorMessage));
        });
      });
  }, []);


  const listOfParks = parks.map(park => {
    return <ParkList key={park.id} data={park}/>
  })

  return (
    <Fragment>
      <div className={`wrapper-interior-header`}>
        <div className="row">
          <div className="small-12 columns">
            <h1 className="park-header-title">All Parks</h1>
          </div>
        </div>
        </div>
        <div className="wrapper-parks">
          <div className="row">
            <SearchContainer 
              parks={parks}
            />
            {/* <EqualHeight>
              {listOfParks}
            </EqualHeight> */}
          </div>
        </div>
    </Fragment>
  );
};
export default ParkContainer