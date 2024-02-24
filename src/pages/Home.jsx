import React, { useContext, useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import axios from "axios";
import { Context, server } from "../main.jsx";
import { Navigate } from "react-router-dom";  
import toast from "react-hot-toast";

function Home() {
  //so yha variable bnate hai for title and description 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  //ye toh empty rhengee starrting mai kyuki ye to hmme dene hai na es liyee   
  const [loading, setLoading] = useState(false); //so ab ek chiz ki jo question aana chahiye tha ki , loading or setLoading hmmne , useState se yha kyu bnayii , hmnee context wali kyu use nhi ki  , uska reason ye hai ki vo wali hmne specfic rkhi hai users ke liyee  , naa ki task ke liye , kyuki agrr us loading ko change kr dengee , so jo header mai loading hai vo bhi true ho jayegii, es liye yaha pe new loading hai 
  const [tasks, setTasks] = useState([]);
  //so eska dekhte hai update ka, ki click hote hi update ho jana chahaiye data, dekho uske liye hmm kya kr sakte hai , ki hmmme useEffect ko call krna hai right , es useEffect ke call hote hi refresh  ho rha tha  dataa , or hmme new data milta hai , to uske liye mai kya kr sakta hu ek variable bnaa sakta hu refresh naam se  
  const [refresh, setRefresh] = useState(false);//eski initial value kuch bhi maan lo false true , doesn't matter 

  const { isAuthenticated } = useContext(Context);
                             //updateHandler jismeki hmme id chahiye , id receive krengee 
    const updateHandler= async(id)=>{
        try {
            const {data}  = await axios.put(
                `${server}/task/${id}`,
                {},
                {
                  withCredentials: true,
                }
              );
              //so alert krna ya toast krna same hi hai koi bhi use kr sakta hai 
              toast.success(data.message);//ye basically same as a alert mesaage ye show kr degaa jaise hi kuch press kroge uske related 
              setRefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const deleteHandler =async(id)=>{
        try {
            const { data } = await axios.delete(
                `${server}/task/${id}`,//eske aage hm data nhi de sakte to ese htaa do , sidha config hai esmee
                {
                withCredentials: true,
               }
            );
        
              toast.success(data.message);
              setRefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
      const { data } = await axios.post(`${server}/task/new `, {
        title,
        description,
      },{
        withCredentials:true,
        headers : {
            "Content-Type" : "application/json",
        }
      });
      //ek chiz mujhe or chiye ki fill krte ke sath hi empty bhi ho jayee , success hote hi kya kro ki empty 
      setTitle("")
      setDescription("")
      //so add task krte hi gyab ho jayegaa esee 
      toast.success(data.message);  
      setLoading(false);
      setRefresh(prev=>!prev);//usme jo bhi previous value hai uska ultaa 
    } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
    }
  };


  //so task aa chuke hai , now one thing is remaining ki niche mai show krne hai (remember you have used a function called getMyTask in a backend )saare task, so for that , hmme esee page pe show krna hai , so useEffect mai krenge jo krenge
  useEffect(() => { //saare task chiyee to es liye get request lagegaa 
    axios.get(`${server}/task/my`,{
        withCredentials:true,
    }).then(res=>{  //and then chaining kr sakte hai hm .then lagake , so response milegaa , or response mai se hm data access kr sakte hai
        // console.log(res.data.tasks); //es se browser ke console mai array aa jayenge task ke but iska krna kya hai 
        //so console krne ki bjaye hm array bna lenge tasks ki
        setTasks(res.data.tasks); //tasks ko set kr dete hai, so phlee console.log krke check kr lenaa kyuaa aayegaa 
    }).catch(e=>{
        toast.error(error.response.data.message); 
    })
  }, [refresh])//useEffect jab jab call ho to refresh ki value badlee , or refresh ki value mai badalta rhungaa kab kab jab task add krengee tab
  
  //so agr user Authenticate nhi hai , to uss case mai khe denge re return Navigate , or usko redirect kr dengee login page pe 
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>


      {/* eske andar saare todos aayengee ,eske upar hamara yha form aayegaa  */}
      <section className="todosContainer">
        {/* //so jo hamre pass tasks ki jo array usko niche map kr denge bas eske andar so */}
        {
        tasks.map((i) => (// yha pe round brackets haii , eskaa mtlb hai ye direct return hi ho rha hai , agr curly braces hote to aesa nhi hota tab uss case mai 

          <TodoItem  //so es div ki bjaye hm esko component ko render krengee 
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted} 
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
} 

export default Home;



//    {tasks.map(()=>(
        // <div key={i._id}> {i.title} </div>
        //so screen pe don task dikh rha haii so, ab ovbiosuly component bnate hai , task or unko show krte hai niche class 1 deke , so for that i will create a component called TodoItem.jsx 

// ))}

//ek chiz or dekho ki , mai chahta hu fill kkrte hi task pe click krte hi empty bhi ho jayee input fields   






/*
Destructuring in JavaScript allows you to extract values from objects and arrays and assign them to variables. Here's a brief explanation of object destructuring using your provided example:

javascript

const response = {
  data: {
    message: "this is deepanshu",
    success: true
  }
};

// Destructuring assignment to extract values
const { data } = response;
const { message, success } = data;

console.log(message);  // Output: "this is deepanshu"
console.log(success);  // Output: true

In this example:

    const { data } = response;: Destructures the response object and extracts the data property. It is equivalent to const data = response.data;.

    const { message, success } = data;: Destructures the data object and extracts the message and success properties. It is equivalent to const message = data.message; and const success = data.success;.

This allows you to create variables with the same names as the properties you are extracting from the object. The destructuring syntax provides a concise way to work with object properties.

Keep in mind that the variable names in the curly braces {} should match the property names in the object. This makes it clear which properties you are extracting.

*/