import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import classes from "./Task.module.css";

const Task = ({ task, allTasks, setAllTasks }) => {
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState("");
	const [updateTask, setUpdateTask] = useState("");
	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:8000/todo/${task.todo_id}`
			);
			setAllTasks(allTasks.filter((todo) => todo.todo_id !== task.todo_id));
		} catch (error) {
			console.log(error);
		}
	};

	const handleTask = async () => {
		try {
			if (updateTask === "") {
				alert("Enter Something");
			} else {
				const response = await axios.put(
					`http://localhost:8000/todo/${task.todo_id}`,
					{
						description: updateTask,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.statusText === "OK") {
					setUpdateTask("");
					setMessage("Task Added Successfully ✨");
					window.location.reload();
					setTimeout(() => {
						setMessage("");
					}, 2000);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{showModal && (
				<>
					<div
						className={classes.overlay}
						onClick={() => setShowModal(false)}></div>
					<div className={classes.editModal}>
						<div className={classes.taskInputContainer}>
							<input
								className={classes.taskInput}
								type="text"
								placeholder="Update your task..."
								value={updateTask}
								onChange={(e) => setUpdateTask(e.target.value)}
							/>
							<button onClick={handleTask}>Update Task</button>
						</div>
					</div>
				</>
			)}
			<div className={classes.task}>
				<FaEdit
					className={classes.editIcon}
					onClick={() => setShowModal(true)}
				/>
				{task.description}
				<FaTrash className={classes.deleteIcon} onClick={handleDelete} />
				<Link to={`${task.todo_id}`}>
					<BiShowAlt className={classes.viewIcon} />
				</Link>
			</div>
		</>
	);
};

export default Task;
