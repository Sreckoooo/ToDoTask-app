import React from "react";
import { TodoForm } from "./TodoForm";
import "../styles/TodoWrapper.css";
import Recents from '../pages/Recents';



const TodoWrapper = () => {

  

  return (
    <div className="TodoWrapper">
      <TodoForm />
      <Recents  />
    </div>
  );
  }

export default TodoWrapper;