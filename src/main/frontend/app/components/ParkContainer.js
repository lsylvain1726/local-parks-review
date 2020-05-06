import React, { useEffect , useState} from "react";
import ParkList from "../components/ParkList";

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
    <div>
      {listOfParks}
    </div>
  );
};
export default ParkContainer