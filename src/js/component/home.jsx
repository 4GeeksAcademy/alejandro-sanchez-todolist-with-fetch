import React from "react";

import ToDoList from "./toDoList";

//create your first component
const Home = () => {
	return (
		<div className="container-xxl d-flex justify-content-center align-items-center">
			<ToDoList/>
		</div>
		
	);
};

export default Home;
