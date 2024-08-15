import React, { useState, useEffect } from "react";
import "../../styles/toDoList.css";

let ToDoList = () => {
    let [newItem, setNewItem] = useState('');
    let [list, setList] = useState({ todos: [] });

    let createUser = () => {
        fetch("https://playground.4geeks.com/todo/users/alejosz1902", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }

    let getlist = () => {
        fetch('https://playground.4geeks.com/todo/users/alejosz1902', {
            method: 'GET',
        })
        .then((response) => {
            if (response.status === 404) {
                createUser();
            }
            return response.json();
        })
        .then(data => setList(data))
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getlist();
    }, []);

    console.log(list.todos);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItem.trim() !== "") {
            const newList = Array.isArray(list.todos) ? [...list.todos, { label: newItem, is_done: false }] : [{ label: newItem, is_done: false }];
            setList({ todos: newList });
            setNewItem("");

            fetch(`https://playground.4geeks.com/todo/todos/alejosz1902`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ label: newItem, is_done: false })
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Error adding task:', response.statusText);
                } else {
                    getlist();
                    console.log('Task added successfully!');
                }
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
        }
    };

    const handleDelete = (index) => {
        const itemToDelete = list.todos[index];
        const newList = list.todos.filter((_, i) => i !== index);
        setList({ todos: newList });

        fetch(`https://playground.4geeks.com/todo/todos/${itemToDelete.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error deleting task:', response.statusText);
            } else {
                getlist();
                console.log('Task deleted successfully!');
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    };

    const handleClearAll = () => {
        setList({ todos: [] });

        fetch('https://playground.4geeks.com/todo/users/alejosz1902', {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error clearing tasks:', response.statusText);
            } else {
                console.log('Tasks cleared successfully!');
            }
        })
        .catch(error => {
            console.error('Error clearing tasks:', error);
        });
    };

    return (
        <div className="card m-2 p-2 col-12 col-md-6">
            <h1 className="fs1 text-center">To Do List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => { setNewItem(e.target.value); }}
                    placeholder="What needs to be done?"
                    className="border-0 fs-2 mx-2 col-10"
                />
            </form>
            <ul>
                {list.todos && list.todos.length > 0 ? (
                    list.todos.map((item, index) => (
                        <li key={index} className="todo-item fs-2">
                            {item.label}
                            <span className="delete mx-2" onClick={() => handleDelete(index)}>
                                <i className="fa-solid fa-trash"></i>
                            </span>
                        </li>
                    ))
                ) : (
                    ""
                )}
            </ul>
            <p className="m-2 text-muted">
                {list.todos && list.todos.length === 0 ? "No tasks, add a task" : `${list.todos.length} items left`}
            </p>
            <button className="btn btn-danger mt-2" onClick={handleClearAll}>
                Clear All
            </button>
        </div>
    );
}

export default ToDoList;
