import React, { useState, useEffect } from "react";

const Home = () => {
	const [tarea, setTarea] = useState([]);

	//creacion de usuario
	function createUser() {
		const requestOptions = {
			method: "POST",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/maliziam", requestOptions)
	}

	// llamar usuario
	function callUser() {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/maliziam", requestOptions)
			.then((response) => response.json())
			.then((result) => setTarea(result.todos))
			.catch((error) => console.error(error));
	}

	//crear tarea
	function createTarea(taskTarea) {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			"label": `${taskTarea}`,
			"is_done": false
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/todos/maliziam", requestOptions)
			.then((response) => response.json())
			.then((result) => setTarea(tarea.concat([result])))
			.catch((error) => console.error(error));
	}

	// eliminar tareas
	function deleteTareaId(tareaId) {
		const requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch(`https://playground.4geeks.com/todo/todos/${tareaId}`, requestOptions)
			.then((response) => {
				if (response.status == 204) {
					callUser();
				}
			})
			.catch((error) => console.error(error))
	}

	useEffect(() => {
		createUser()
		callUser()
	}, [])

	return (
		<div className="container d-flex flex-column align-items-center">
			<h1>Mis Tareas</h1>
			<input className="input-group mb-3 w-50" type="text"
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						createTarea(e.target.value)
						e.target.value = ""
					}
				}} />
			<ul className="list-group w-50 d-flex justify-content-between">
				{tarea.map((task, index) => (
					<li key={index} className="list-group-item d-flex justify-content-between " >
						{task.label}   <svg onClick={() => {
							deleteTareaId(task.id)
							callUser()
						}
						} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
					</li>
				))}
			</ul>
			<div className="len">{tarea.length} tareas</div>
		</div>
	);
};

export default Home;
