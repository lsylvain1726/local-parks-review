import { useEffect, useState } from "react";

const StateContainer = (props) => {
    const [states, setStates] = useState([]);
    useEffect(() => {
        fetch("api/v1/states")
        .then((response)=>{
            if(response.ok) {
                return response;
            } else {
                let errorMessage = `${response.status} (${response.statusText})`,
                error= new Error(errorMessage);
                throw error;
            }
        })
        .then((response)=>response.json())
        .then((data) => {
            setStates(data);
        })
        .catch((error)=> {
            error.text().then((errorMessage) => {
                this.props.dispatch(displayError(errorMessage)); 
            });
        });
    }, []);
    const listOfStates =states.map(state => {
        return <StateList key={state.id} data={state}/>
    })
    return (
        <div>
            {listOfStates}
        </div>
    );
};

export default StateContainer