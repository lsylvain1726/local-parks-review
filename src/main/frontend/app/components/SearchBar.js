import React, { Component }  from "react";
import ReactDOM from "react-router-dom";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);
        return(
            <div>
                <input type="text" className="input" placeholder="Search..." />
                <ul>
                    <li><Link to="/searchBar">Search Bar</Link></li>
                </ul>
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
    }

    componentDidMount() {
        fetch("api/v1/parks/searchBar")
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
                console.log(data)
              this.setState({
                filtered: data
              });
            })
            .catch((error) => {
              error.text().then((errorMessage) => {
                this.props.dispactch(displayError(errorMessage));
              });
            });
      }
      
      componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: name 
        });
      }


      handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.items;

      newList = currentList.filter(item => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.items;
    }

    this.setState({
      filtered: newList
    });
  }
}

export default SearchBar
