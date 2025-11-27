import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;

