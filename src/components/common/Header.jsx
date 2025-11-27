import React from "react";
import "../../css/Header.css";
import Dropdown from "./Dropdown";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        <div className="header-actions">
          <Dropdown/>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
