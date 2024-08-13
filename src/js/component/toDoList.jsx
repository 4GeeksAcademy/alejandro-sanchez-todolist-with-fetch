import React, { useState } from "react";
import toDoList from "../../styles/toDoList.css"

let ToDoList = () => {
    let [newItem,setNewItem] = useState('');
    let [list,setList] = useState(["Wash my hands","Eat","Walk the dog"]);
    
    let handleSubmit = (e) => {
        e.preventDefault();
        if (newItem.trim() !== ""){
            setList([...list,newItem]);
            setNewItem('');
        }
    }

    return(
        <div className="card m-2 p-2 col-12 col-md-6">
            <h1 className="fs1 text-center">To Do List</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" value={newItem} onChange={(e)=>{setNewItem(e.target.value)}} placeholder="What needs to be done?" className="border-0 fs-2 mx-2 col-10"/>
            </form>
            <ul>
            {list.length !== 0 ? (
                    list.map((item, index) => (
                        <li key={index} className="todo-item fs-2">
                            {item} 
                            <span className="delete mx-2" onClick={() => {
                                    let newList = list.filter((_, i) => i !== index);
                                    setList(newList);}}><i class="fa-solid fa-trash"></i></span>
                        </li>
                    ))
                ) : (
                    ""
                )}
            </ul>
            <p className="m-2 text-muted">{list.length === 0 ? ("No tasks, add a task"):(`${list.length} items left`)}</p>
        </div>
        
    );
}

export default ToDoList;