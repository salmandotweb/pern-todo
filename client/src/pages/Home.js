import React, { useState } from "react";
import AddTasks from "../components/AddTasks/AddTasks";
import AllTasks from "../components/AllTasks/AllTasks";
import Header from "../components/Header/Header";

const Home = () => {
  const [image, setImage] = useState("");
  return (
    <div className="App">
      <Header />
      <AddTasks image={image} setImage={setImage} />
      <AllTasks />
    </div>
  );
};

export default Home;
