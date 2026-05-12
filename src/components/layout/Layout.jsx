import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import './Layout.css';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className={`layout ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Header />
      <Sidebar onToggle={handleSidebarToggle} initialState={true} />
      <div className={`layout-body ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <Footer sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default Layout;