import React, { useState } from "react";
import "../styles/EditUreForm.css";


export const EditUreForm = ({ taskid, onCancel,onSubmit}) => {
  const [value, setValue] = useState(taskid.taskid);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value)
    
   
  };
 


 return (
    <form className="EditUreForm" onSubmit={handleSubmit}>
      <input
        type="number"
        className="edit-input"
        value={value}
        placeholder="Update Time"
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="edit-btns">
        <button type="submit" className="edit-btn">
          Update Time
        </button>
        <button type="button" className="edit-btn cancel-btn" onClick={() => onCancel()}>
          Cancel
        </button>
      </div>
    </form>
  );
};