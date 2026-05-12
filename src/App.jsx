import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './App.css';

import { 
  Layout, 
  ComplianceDashboard, 
  ComplianceCreate, 
  DisplayAllCompliance, 
  DisplayOneRecord, 
  ComplianceEdit,
  AuditDashboard,
  AuditCreate,
  DisplayAllAudits,
  AuditEdit,
  ReportDetails,
  CreateReport,
  ReportsDashboard,
  AnalyticsDashboard,AuditDetails
} from './core/registry'; 
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/compliance" replace />} />
          <Route path="/compliance" element={<ComplianceDashboard />} />
          <Route path="/compliance/create" element={<ComplianceCreate />} />
          <Route path="/compliance/list" element={<DisplayAllCompliance />} />
          <Route path="/compliance/:id" element={<DisplayOneRecord />} />
          <Route path="/compliance/:id/edit" element={<ComplianceEdit />} />

          <Route path="/audit" element={<AuditDashboard />} />
          <Route path="/audit/create" element={<AuditCreate />} />
          <Route path="/audit/list" element={<DisplayAllAudits />} />
          <Route path="/audit/:id" element={<AuditDetails />} />
          <Route path="/audit/:id/edit" element={<AuditEdit />} />
          
          <Route path="/reports" element={<ReportsDashboard />} />
          <Route path="/reports/create" element={<CreateReport />} />
          <Route path="/reports/analytics" element={<AnalyticsDashboard />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ maxWidth: "500px", minWidth: "max-content" }}
      />
    </Router>
  );
}

export default App;