import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './App.css';

import { Layout } from './components/layout/Layout';
// Corrected relative paths
import { Documents } from './roles/Citizen/areefModule2/Documents';
import { Registration } from './roles/Citizen/areefModule2/Registration';
import { Profile } from './roles/Citizen/areefModule2/Profile';
import { CitizenManagement } from './roles/Admin/areefModule2/CitizenManagement';
import { DocumentVerification } from './roles/Admin/areefModule2/DocumentVerification';
import { NotFound } from './components/common/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Registration />} />
          <Route path="registration" element={<Registration />} />
          <Route path="documents" element={<Documents />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="admin" element={<Layout />}>
          <Route index element={<CitizenManagement />} />
          <Route path="citizen-management" element={<CitizenManagement />} />
          <Route path="document-verification" element={<DocumentVerification />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;