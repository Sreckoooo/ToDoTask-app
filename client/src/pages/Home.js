import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import TodoWrapper from "../helpers/TodoWrapper";

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleAddTask = () => {
    setShowForm((prevState) => !prevState);
  };

  
  setInterval(() => {
    setCurrentDateTime(new Date());
  }, 1000);

  return (
    <div className="home">
      <section className="sectionfirst">
        <div>
          <h1>Your daily Goals!</h1>
          <p className="datetime">{currentDateTime.toLocaleString()}</p>
        </div>
      </section>
      <div className="headerContainer">
        <div className="buttonsContainer">
          <button onClick={handleAddTask}>Add Task</button>
          <Link to="/Tasks">
            <button>View All Tasks</button>
          </Link>
        </div>
        {showForm && (
          <TodoWrapper setShowForm={setShowForm} />
        )}
      </div>
    </div>
  );
}

export default Home;

