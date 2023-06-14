import React, { useState } from "react";
import "../styles/EditTodoForm.css";


export const EditTodoForm = ({ task, onCancel,onSubmit}) => {
  const [value, setValue] = useState(task.task);
  const [dueDate, setDueDate] = useState(task.dueDate.slice(0,10));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value, dueDate)
    
   
  };
 


 return (
    <form className="EditTodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="edit-input"
        value={value}
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="date"
        className="edit-input"
        value={dueDate}
        placeholder="Update Date"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="edit-btns">
        <button type="submit" className="edit-btn">
          Update Task
        </button>
        <button type="button" className="edit-btn cancel-btn" onClick={() => onCancel()}>
          Cancel
        </button>
      </div>
    </form>
  );
};