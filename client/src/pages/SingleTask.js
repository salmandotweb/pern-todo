import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const SingleTask = () => {
  const [singleTask, setSingleTask] = useState("");
  let { taskId } = useParams();
  const handleSingleTask = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/todo/${taskId}`);
      setSingleTask(data.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSingleTask();
  }, []);
  return (
    <div>
      <Link to="/">
        <IoMdArrowRoundBack className="backLink" />
      </Link>
      <p className="singleTask">{singleTask}</p>
    </div>
  );
};

export default SingleTask;
