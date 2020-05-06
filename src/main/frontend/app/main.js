import ReactDom from "react-dom";
import ParkContainer from "./components/ParkContainer";

const App = (props) => {
  return (
    <div>
      <ParkContainer />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
