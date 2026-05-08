import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './Layout.css';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
    return (
    <div className={`layout ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Header />
      <div className={`layout-body ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <Sidebar onToggle={setSidebarOpen} initialState={sidebarOpen} />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;