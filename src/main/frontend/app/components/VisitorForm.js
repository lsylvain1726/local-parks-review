import React, {useState, useEffect} from 'react';
import _ from 'lodash'

const VisitorForm = props => {
   const defaultForm= {
    firstName: "",
    lastName: ""
   }

const [visitorForm, setVisitorForm] = useState(defaultForm)
const [errors, setErrors] = useState("")

const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["firstName", "lastName"]
    requiredFields.forEach((field)=>{
        if(visitorForm[field].trim() === "" || visitorForm[field]=== null){
            submitErrors = {
                ...submitErrors,
                [field]: "is blank"
            }
        }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
}

const handleChange = event => {
    setVisitorForm({
        ...visitorForm,
        [event.currentTarget.id]: event.currentTarget.value
    })
}
const handleSubmit = formPayload =>{
    if (validForSubmission) {
        console.log(JSON.stringify(formPayload))
   fetch(`api/v1/visitor`, {
       method: "POST",
       body: JSON.stringify(formPayload),
       headers: {
           "Content-Type": "form/json"
       }
   })
   .then(response => {
       if(response.ok) {
           return response
       } else {
           let errorMessage= `${response.status} (${response.statusText})`,
           error= new
           Error(errorMessage)
           throw error
       }
   })
   .then(response => {
    response.json()
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
}



return(
    <form onSubmit={handleSubmit}  >
        <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" onChange={handleChange}></input>
        </div>
        <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" onChange={handleChange}></input>
        </div>
        <div>
            <input name="button" type="submit" className="button" />
        </div>
    </form>
)

}

export default VisitorForm