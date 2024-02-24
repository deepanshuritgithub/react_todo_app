import React from "react";

const TodoItem = ({ //so phle to kuch chize lengee , jo humme task krne ke liye chahiyee , jaise ki 
  title,
  description,
  isCompleted, //task complete hua ya nhi hua ye btana ke liye check box 
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="todo">
            <div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>

            <div>
                <input    //ese nhi skte direct , hmme yha pe id bhi pass krni hai , id kha se lenge ,simply upar se access krengee 
                onChange={() => updateHandler(id)} //ab hmme dena hai oncahnge jaise koi , ispe click kre to kya ho , ya fior button pe kre to kya hoo
                type="checkbox"
                checked={isCompleted}  //so isCompleted ko yha de denge ye uski default value rhegii , default value ka mtlb checked , checked mai true or false ki bjeaye hm iscompleted pass kr dengee 
                />                
                <button onClick={() => deleteHandler(id)} className="btn">
                Delete
                </button>
            </div>
    </div>
  );
};

export default TodoItem;