import React from 'react';
import './AdminModule.css';

export const Profile = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Admin Profile</h1>
        <p>Manage your admin account details, permissions, and system access information.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-row">
            <strong>Admin ID</strong>
            <p>ADM-001</p>
          </div>
          <div className="profile-row">
            <strong>Name</strong>
            <p>Admin User</p>
          </div>
          <div className="profile-row">
            <strong>Role</strong>
            <p>System Administrator</p>
          </div>
          <div className="profile-row">
            <strong>Department</strong>
            <p>Finance Ministry</p>
          </div>
          <div className="profile-row">
            <strong>Access Level</strong>
            <p>Full Access</p>
          </div>
        </div>

        <div className="profile-contact">
          <div className="contact-row">
            <p>Email</p>
            <strong>admin@finance.gov.in</strong>
          </div>
          <div className="contact-row">
            <p>Phone</p>
            <strong>+91 78697 12345</strong>
          </div>
          <div className="contact-row">
            <p>Location</p>
            <strong>New Delhi</strong>
          </div>
          <div className="contact-row">
            <p>Last Login</p>
            <strong>08 May 2026</strong>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h2>Permissions & Access</h2>
        <p className="biography">As a system administrator, you have full access to citizen management, document verification, registration approvals, and system configuration. Regular security audits are performed to maintain data integrity.</p>
      </div>
    </div>
  );
};

export default Profile;