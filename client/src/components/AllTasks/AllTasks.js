import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import classes from "./AllTasks.module.css";

const AllTasks = () => {
	const [allTasks, setAllTasks] = useState([]);
	const [order, setOrder] = useState({
		orderState: "Newest",
	});
	const handleAllTask = async () => {
		try {
			const { data } = await axios.get("http://localhost:8000/allTodos");
			setAllTasks(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = async (e) => {
		setOrder({
			orderState: e.target.value,
		});

		try {
			if (order.orderState === "newest") {
				const { data } = await axios.get(
					"http://localhost:8000/allNewestTodos"
				);
				setAllTasks(data);
			} else if (order.orderState === "oldest") {
				const { data } = await axios.get(
					"http://localhost:8000/allOldestTodos"
				);
				setAllTasks(data);
			} else {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		handleAllTask();
	}, []);

	const options = [
		{
			label: "Newest",
			value: "newest",
		},
		{
			label: "Oldest",
			value: "oldest",
		},
	];

	return (
		<>
			<select
				className={classes.orderBy}
				value={order.orderState}
				onChange={handleChange}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{allTasks.length}
			<div className={classes.allTasks}>
				{allTasks.map((task) => (
					<Task
						key={task.todo_id}
						task={task}
						allTasks={allTasks}
						setAllTasks={setAllTasks}
					/>
				))}
			</div>
		</>
	);
};

export default AllTasks;
