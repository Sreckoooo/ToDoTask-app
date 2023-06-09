import React from "react";
import { TodoForm } from "./TodoForm";
import "../styles/TodoWrapper.css";
import Tasks from '../pages/Tasks';



const TodoWrapper = () => {

  

  return (
    <div className="TodoWrapper">
      <TodoForm />
      <Tasks  />
    </div>
  );
  }

export default TodoWrapper;