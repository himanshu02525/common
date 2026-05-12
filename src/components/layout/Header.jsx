import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LogOut, ArrowRightLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdmin = pathname.startsWith('/admin');
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  const handleSwitchPortal = () => {
    navigate(isAdmin ? '/' : '/admin');
  };

  return (
    <motion.header
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="header-container">
        <div className="header-brand">
          <motion.div
            className="header-logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 size={32} />
          </motion.div>
          <div className="brand-text">
            <h1>FinanceGov {isAdmin ? 'Admin' : 'Citizen'} Portal</h1>
            <p>Welcome back, {isAdmin ? 'Admin User' : 'citizen user'}</p>
          </div>
        </div>

        <div className="header-info">
          <div className="role-info">
            <span className="role-badge">{isAdmin ? 'Admin' : 'Citizen'}</span>
          </div>
          <button className="switch-btn" onClick={handleSwitchPortal}>
            <ArrowRightLeft size={18} />
            <span>Switch to {isAdmin ? 'Citizen' : 'Admin'}</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
