import React from 'react'

function practiceReact() {
                //it is a function that takes a parameter e the variable name e is a convention often used for an event object in js, especially wih eventHandlers in react 

const submitHandler=(e)=>{
  //this is just an arrow function
 e.prevetDefault();//so jab hm click kr rhe the login pee to refresh ho rha tha page , so prevent default krne se ab refresh nhi hoga pagee , react ke app ka fyda hi kya agr refresh ho rha ha pagee , so  s se ab refresh nhi hogaa pagee , hmme ese page pe krna hai fetching 
//  setName(e.target.value):
//  This calls the setName function and passes the value of the input field as an argument. This is typically used in a React functional component where setName is a state-setting function, updating the state variable name with the new value.
value={name};  //This sets the current value of the input field to the value stored in the name variable (or state)

}

  return (
    <div>HEY BRO kya haal hai </div>
  )
}

export default practiceReact