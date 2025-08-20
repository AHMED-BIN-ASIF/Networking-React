import React from "react";
import "../../css/Header.css";
import Dropdown from "./Dropdown";

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
      <Dropdown/>
      </div>
    </header>
  );
};

export default Header;
