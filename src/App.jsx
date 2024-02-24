import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main.jsx";

function App() {
  //setUser Import
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);
  //for getting our profile
  useEffect(() => {
    //so jaise hi hmarari app start hogi hm call kr dengee apne es function ko jo hm bnaane wala hai , function bna lete hi , infact we use promises , kyuki otherwise function bnaoo or fir usko niche call kroo , kyuki khali ese function ko async nhi bna sakte naa , ek function bnan padegaa , es liye uski bjaye sidhaa axios
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true, //so make sure ye jarur do , nhi to cookies nhi phuchegi hmare browser pe
      }).then((res) => {
        //then mai response mil jayegaa , so niche res.krunga to data mil jayega , data milegaa , data mai basically hmme user ki information milegi , so chaho to user ki information store kr sakte ho es moment pe but hm krna chaha to kr sakta hai store kr deta hai so uske liye hm again context mai jayengee
        // res.data.user krte hi user mil jayegaa
        // so hm simply likh denge 
        setUser(res.data.user);//user ki information store krne ke liye hmmne esaa kiyaa 
        setIsAuthenticated(true); //yha kr denge esko true kyuki user hai
        setLoading(false); //load nhi hona chiye data milne ke baad , error aata hai tab bhu laod nahi hona chahiye 
      })
      .catch((error) => {
        // error.response.data.message //ese krke merko exact mesaage mil jayega jo ki mujhe already malum hai kya hai , not logged in , chahe to message mt do koi frak nhi padtaa
        setUser({}); //uske alawa hm yha de dengee setuser se user ki information kr denge null , empty object
        setIsAuthenticated(false); //yha  krdengee, false kyuki logged in nhi  hai
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
