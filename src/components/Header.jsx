import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

function header() {

  // so ab hm aate hain yha pe isAuthenticated ki value ko access kr sakte hai , so for that we need use Context
  const { isAuthenticated, setIsAuthenticated ,loading, setLoading } = useContext(Context); //so ye ek object hai basically to mai directly access kr sakta hu isAuthenticated bhi or setIsAuthenticated bhi 
//this functionality is for logout 
  const logoutHandler = async() => {
    setLoading(true);//so jaise ye function upar wala call hote hi setLoading true hogyii, or esko true hi rkhenge jab tak ko message na aajayee  otherwise false,to es se hmme ptaa lag jayegaa ki loading true hai ya nhi , agr loading true hai , to us case mai button ko kr dengee disabled 


    //first thing jo krenge vo krengee e.prevent    Default , ye krna se kya hoga ki jab hmm signup pe click kengee to page refresh nhi hoga , agr click krte hi refresh hora hai pagee to kya hi fydaa uskaa es liiyee e.preventDefault krengee , so ye krnee se refresh nhi hogaa , hmme ese page krna hai fetching , mtlb user create ese webpage pe krna hai
    // e.preventDefault();ab esme ek prevent default ki jrurat nhi hai , kuki koi form nhi hai hamara , normal button haii 
    // console.log(name, email, password); //ye 3no chizee browser mai show ho jayee , browser ke console mai
    //AB YHA PE HMME axios ka use krke request krni ha hmme , apne purane URL pe
    try {
      //ab yha pe hmme es data ki bhi koi jrurat nhi 
        await axios.get(//ab esme se data access kr lenge hmm , data mai kya hoga ki jo backend se milta hai response mai obviosuly message 
        `${server}/users/logout`,
        // yha koi data bhjna hi nhi  
         {//ab eske baad agli chiz sirf config aayegii , headrs bhi nhi bhjnee , with credentials bhjna haii 
          //config mai hm pass kr sakta hai headers kya hai
          //ek chiz jo maine mandatory kha tha ki credentials true kr denaa , otherwise cookie work nhi kregii
          withCredentials: true,
        }
      );
  
  
       //so ab yha pe hm data ko toast kr sakte hai , kese , hm bolengee toast , so phle toast ko import bhi krna padegaa 
      toast.success("Logged Out Successfully")  //agr mai kuch na krke ye bhi toast kr doo , phle to ye work hi nhi krega aye hmme apne app mai  add krna hota hai ,     import krna pdta hai , Routes ke baad end mai tpoaster addd kr sakte hai 

          //so agr success ho jata hai to es baar hmm ese khe dengee false 
       setIsAuthenticated(false);
       setLoading(false); 
       
    } catch (error) {
        toast.success(error.response.data.message);
        setIsAuthenticated(true);//agr ki error aaye to true hi rhegaa 
        setLoading(false);
    }
};


  // console.log(isAuthenticated);
  //ab mai eski value niche use kr sakta hu isAuthenticated ki value
  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>

      <article> 
        <Link to={"/"}>Home</Link>
        <Link to={"/Profile"}>Profile</Link>
        {/* //so mai eski value isAuthenticated ki niche use kr sakta hu ki true ho to ye dikhaoo otherwise ye niche wala dikhaoo,true means login ho already user, to logout dikhaoo , otherwise login dikhaoo  */}
        {isAuthenticated ? (
          <button disabled={loading}  onClick={logoutHandler} className="btn">Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
}

export default header;
