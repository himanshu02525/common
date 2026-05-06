import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './Layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />

      <div className="layout-body">
        <main className="main-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;