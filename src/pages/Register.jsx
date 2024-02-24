import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

function Register() {
  //so variable create  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");//after that in form , input , value mai pass kr dengee name , or onChange mai setname
  const { isAuthenticated, setIsAuthenticated,loading, setLoading } = useContext(Context);

  const submitHandler = async(e) => {
    setLoading(true);
    //first thing jo krenge vo krengee e.prevent    Default , ye krna se kya hoga ki jab hmm signup pe click kengee to page refresh nhi hoga , agr click krte hi refresh hora hai pagee to kya hi fydaa uskaa es liiyee e.preventDefault krengee , so ye krnee se refresh nhi hogaa , hmme ese page krna hai fetching , mtlb user create ese webpage pe krna hai
    e.preventDefault();
    // console.log(name, email, password); //ye 3no chizee browser mai show ho jayee , browser ke console mai
    // so AB YHA PE HMME axios ka use krke request krni ha hmme , apne purane URL pe
    try {
        const {data} = await axios.post(//ab esme se data access kr lenge hmm , data mai kya hoga ki jo backend se kya milta hai hmme response mai obviosuly message 
        `${server}/users/new`,
        {
          //ab yha pe hmme yaa to await lagana hai ya to niche pe then laga sakte ha jaisa preferrable ho
          name,
          email,
          password,
        },
         {
          //config mai hm pass kr sakta hai headers , yha hm bata sakta hai headers kya hai
          headers: {
            "Content-type": "application/json", //agr na bhi do to bydefault axios se hi hai application to bhi chal jayegaa
          },
          //ek chiz jo maine mandatory kha tha ki withcredentials true kr denaa , otherwise cookie work nhi kregii
          withCredentials: true,
        }
      );
      // In React, a "toast" is a UI element that is typically used to display non-intrusive messages or notifications to the user. Toast messages are often short-lived(for a small perod of time basically ) and appear at the bottom or top of the screen. They provide feedback about the outcome of a user action or alert the user to important information.
  
       //so bs ab yha pe hm data ko toast kr sakte hai , kese , hm bolengee toast , so phle toast ko import bhi krna padegaa 
      toast.success(data.message)  //agr mai kuch na krke ye bhi toast kr doo , phle to ye work hi nhi krega , kyuki ye hmme apne app mai add krna hota hai , import krna pdta hai, Routes ke baad end mai toaster addd kr sakte hai 

      //so toastt krne ke baad hm kya krenge setIsAuthenticatd mai true daal dengee
       setIsAuthenticated(true); 
       setLoading(false);
    } catch (error) {
        toast.success(error.response.data.message);
        setIsAuthenticated(false);//agr koi error aaye to false daal dengee 
        setLoading(false);   
    }
};
//ek or chiz krenge hm ki isAuthenticated hai to ese redirect kr dengee hm register wala page se kaha pe hmara Home page pe 
    if(isAuthenticated === true) return <Navigate to={"/"}/>


  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name} //This sets the current value of the input field to the value stored in the name variable (or state)
            onChange={(e) => setName(e.target.value)} 
            // e.target.value=> This accesses the current value of the input field that triggered the event. 
            type="text"
            placeholder="Name"
            required
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {/* so eski help se hm unnecessary call sa bach jayengee  ki suppose koi sanki aadmi aaya or baar baar click kr rha hai button pe ,kyuki api mai time to lagegaa na kuch hone mai , so jaise hi ab hm button press krengee then button disabled ho jayegaa 1 baar click krte hi , disabled ho gya button , so ese throttling bolte hai , 
            //throttling ->:  
            Throttling allows you to limit the number of successful hits to an API during a given period, typically in cases such as the following: To protect your APIs from common types of security attacks such as certain types of denial of service (DOS) attacks. */}
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>  
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
}

export default Register;
