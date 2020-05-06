import React, {useState, useEffect} from React;

const VisitorForm = props => {
   const defaultForm= {
    firstName: "",
    lastName: ""
   }

const [visitorForm, setVisitorForm] = useState(defaultForm)

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
        ...visitorFormSubmitted,
        [event.currentTarget.id]: event.currentTarget.value
    })
}
const handleSubmit = event =>{
    event.preventDefault()
    let formPayload ={
        firstName:visitorFormSubmitted.firstName,
        lastName:visitorFormSubmitted.lastName 
    }
    if(validForSubmission()){
        props.addVisitor(formPayload)
        props.setShowForm(false)
    }
}

return(
    <form onSubmit={handleSubmit}>
        <ErrorList errors={errors} />
        <div>
            <input type="text" name="first_name" id="first_name" onChange={handleChange}></input>
        </div>
        <div>
            <input type="text" name="last_name" id="last_name" onChange={handleChange}></input>
        </div>
    </form>
)

}

export default VisitorForm