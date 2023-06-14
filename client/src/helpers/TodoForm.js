import React, { useState } from "react";
import "../styles/TodoForm.css";
import { useMutation } from "react-query";
import axios from "axios";

export const TodoForm = () => {
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const addTodo = useMutation((todo) => {
    return axios.post("/api/task", { task: todo, dueDate: dueDate })

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo.mutate(value);
    setValue("");
    setDueDate("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />

      <input
        type="date"
        className="todo-input"
        value={dueDate}
        placeholder="Example: 2000-11-11"
        onChange={(e) => {
          setDueDate(e.target.value)
          console.log(e.target.value)
        }}
      />

      <button type="submit" className="todo-btn">
        Add Task
      </button>

      {addTodo.isError && <div className="error">{addTodo.error.message}</div>}
      {addTodo.isSuccess && <div className="success">Uspešno dodan!</div>}
    </form>
  );
};