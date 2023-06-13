import React, { useState } from "react";
import "../styles/TodoForm.css";
import { useMutation } from "react-query";
import axios from "axios";

export const TodoForm = () => {
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const addTodo = useMutation((todo) => {
    axios
      .post("/api/task", { task: todo, dueDate: dueDate })
      .then((response) => {
        console.log("Task added successfully");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
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
        type="text"
        className="todo-input"
        value={dueDate}
        placeholder="Due date"
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};