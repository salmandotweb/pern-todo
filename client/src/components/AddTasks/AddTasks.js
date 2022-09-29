import React, { useState } from "react";
import axios from "axios";
import classes from "./AddTasks.module.css";

const AddTasks = ({ image, setImage }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [message, setMessage] = useState("");
  const [task, setTask] = useState("");

  const handleTask = async () => {
    try {
      if (task === "") {
        alert("Enter Something");
      } else {
        const response = await axios.post(
          "http://localhost:8000/todos",
          {
            description: task,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const formData = new FormData();
        formData.append("image", image);
        formData.append("todo_id", response.data.todo_id);
        axios.post("http://localhost:8000/image", formData, {}).then((res) => {
          console.log(res);
        });

        if (response.statusText === "OK") {
          setTask("");
          setShowTaskInput(false);
          setMessage("Task Added Successfully ✨");
          setTimeout(() => {
            setMessage("");
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className={classes.addTasks}>
      {!showTaskInput && (
        <button onClick={() => setShowTaskInput(!showTaskInput)}>
          Add Task
        </button>
      )}
      {showTaskInput && (
        <div className={classes.taskInputContainer}>
          <div>
            <input
              className={classes.taskInput}
              type="text"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* <button onClick={() => imageUploadRef.current.click()}>
							<AiOutlineUpload />
							Upload
						</button> */}
          </div>
          <button onClick={handleTask}>Add Task</button>
        </div>
      )}

      {message && <p className="successMessage">{message}</p>}
    </div>
  );
};

export default AddTasks;
