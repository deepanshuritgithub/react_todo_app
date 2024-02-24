import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import { createContext } from "react";

export const server ="https://nodejs-todoapp-a8v3.onrender.com/api/v1";
//BUT FOR NOW LET'S CREATE A CONTEXT PROVIDER 
//so we will create a context so , we can name anything
export const Context = createContext({ isAuthenticated: false }); //eske andar object mann liya hmmne jisme isAuthenticated hai , jiski value hai by default false
//so ab ye jo context hai eske andar provider milegaa hmmee , context ke andar 2 xhize hai ,consumer or provider , provider chiye hmme , provider ke andar apni app wrap kr dengee  , ab hum es app ke andar hm es variable ko isAuthenticated ko kahi bhi use kr sakte hi   


//ab hm normal component bnaa rhe ha react ka , bs ek arrow function hai  jo ki return krta hai context provider ko   
const AppWrapper = () => {
  //now es se hua kya ki hmra context provider yha hai , ab yha hm value bnaa sakte hai isAuthenticated ki
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    //ab ye hm isAuthenticated pass kr sakte hai esmee , so value mai kr dengee   , ye dono chize pass, value woll be an object with both of these values
    <Context.Provider
      value={{
        //value will be an object 
        isAuthenticated,
        setIsAuthenticated, //so esko hm changee kr sakte hai upar setteer function ki help se , so jb hmee eske andar true or false set krana ho to ,to hm setfunction ki help se set kra sakte hai  
        loading,
        setLoading,
        user,
        setUser,    
      }}
    >
      {/* hm apne provide ke andar isAuthenticated ese to de sakte hai value,  lekin usko change nhi kr sakte  future mai kyu , kyuki hmare pass setter function nhi hai iskaa , , insted what will doo , we will take this   */}
      <App />
      {/* provider ke andar apni app wrap kr dengee , and apni app ke andar hm es variable ko isAutheniticated ko khi  bhi use kr sakte hai , chahe Home ho ya Login ho jo bhi ho  */}
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
