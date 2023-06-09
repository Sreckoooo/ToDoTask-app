import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";



function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
       </div>
      <div className="rightSide">
        <Link to="/"> Domov </Link>
        <Link to="/tasks"> Tasks </Link>
        <button onClick={toggleNavbar}>
          <img alt="Button" className="navbar-size" />
        </button>        
      </div>
    </div>
  );
}

export default Navbar;