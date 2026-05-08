import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './App.css';

import Layout from './components/layout/Layout';
import ComplianceDashboard from './roles/ComplianceOfficer/bharatModule6/ComplianceDashboard';
import ComplianceCreate from './roles/ComplianceOfficer/bharatModule6/ComplianceCreate';
import DisplayAllCompliance from './roles/ComplianceOfficer/bharatModule6/DisplayAllCompliance';
import DisplayOneRecord from './roles/ComplianceOfficer/bharatModule6/DisplayOneRecord';
import ComplianceEdit from './roles/ComplianceOfficer/bharatModule6/ComplianceEdit';
import AuditDashboard from './roles/GovernmentAuditor/AuditDashboard';
import AuditCreate from './roles/GovernmentAuditor/AuditCreate';
import DisplayAllAudits from './roles/GovernmentAuditor/DisplayAllAudits';
import DisplayOneAudit from './roles/GovernmentAuditor/DisplayOneAudit';
import AuditEdit from './roles/GovernmentAuditor/AuditEdit';
import ReportsDashboard from './roles/reportsAnalytics/pages/ReportsDashboard';
import ReportDetails from './roles/reportsAnalytics/pages/ReportDetails';
import ScopeReports from './roles/reportsAnalytics/pages/ScopeReports';
import CreateReport from './roles/reportsAnalytics/pages/CreateReport';
import ReportsList from './roles/reportsAnalytics/components/report/ReportsList';
import DisplayAllReports from './roles/reportsAnalytics/pages/DisplayAllReports';

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
          <Route path="/audit/:id" element={<DisplayOneAudit />} />
          <Route path="/audit/:id/edit" element={<AuditEdit />} />
          
          <Route path="/reports" element={<DisplayAllReports />} />
          <Route path="/reports/create" element={<CreateReport />} />
          <Route path="/reports/analytics" element={<ReportsDashboard />} />
          <Route path="/reports/scope/:scope" element={<ScopeReports />} />
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