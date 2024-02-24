import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    //first thing jo krenge vo krengee e.prevent    Default , ye krna se kya hoga ki jab hmm signup pe click kengee to page refresh nhi hoga , agr click krte hi refresh hora hai pagee to kya hi fydaa uskaa es liiyee e.preventDefault krengee , so ye krnee se refresh nhi hogaa , hmme ese page krna hai fetching , mtlb user create ese webpage pe krna hai
    e.preventDefault();
    setLoading(true);
    // console.log(name, email, password); //ye 3no chizee browser mai show ho jayee , browser ke console mai
    //AB YHA PE HMME axios ka use krke request krni ha hmme , apne purane URL pe
    try {
      const { data } = await axios.post(
        //ab esme se data access kr lenge hmm , data mai kya hoga ki jo backend se milta hai response mai obviosuly message
        `${server}/users/login`,
        {
          //ab yha pe hmme yaa to await lagana hai ya to niche pe then laga sakte ha jaisa preferrable ho
          email,
          password,
        },
        {
          //config mai hm pass kr sakta hai headers kya hai
          headers: {
            "Content-type": "application/json", //agr na bhi do to bydefault axios se hi hai application to bhi chal jayegaa
          },
          //ek chiz jo maine mandatory kha tha ki credentials true kr denaa , otherwise cookie work nhi kregii
          withCredentials: true,
        }
      );

      //so ab yha pe hm data ko toast kr sakte hai , kese , hm bolengee toast , so phle toast ko import bhi krna padegaa
      toast.success(data.message); //agr mai kuch na krke ye bhi toast kr doo , phle to ye work hi nhi krega aye hmme apne app mai  add krna hota hai ,     import krna pdta hai , Routes ke baad end mai toaster addd kr sakte hai

      //so toastt krne ke baad hm kya krenge setIsAuthenticatd mai true daal dengee
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.success(error.response.data.message);
      setIsAuthenticated(false); //agr ki error aaye to false daal dengee
      setLoading(false);
    }
  };

  if (isAuthenticated  === true) 
  {
    console.log(isAuthenticated, "taskkk bhaii");
    return <Navigate to={"/"} />;
  }
  console.log(isAuthenticated, "taskkk bhaii");

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
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
          {/* so eski help se hm unnecessary call sa bach jayengee  ki suppose koi sanki aadmi aaya or baar baar click kr rha hai button pe ,kyuki api mai time to lagegaa na kuch hone mai so jaise hi ab hm button press krengee then button disabled ho jayegaa 1 baar click krte hi , disabaled ho gya button , so ese throttling bolte hai , Throttling allows you to limit the number of successful hits to an API during a given period, typically in cases such as the following: To protect your APIs from common types of security attacks such as certain types of denial of service (DOS) attacks. */}
          <button disabled={loading} type="submit">Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
