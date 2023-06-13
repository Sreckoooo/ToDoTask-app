import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({searchTerm, onChange}) => {



  return (
    <form className="search-form">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        onChange={(e) => onChange(e.target.value) }
        value={searchTerm}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;


//{$and:[{task: {$regex: /lahko/}},{task	: {$regex: /task/}},{task	: {$regex: /zelis/}}]}