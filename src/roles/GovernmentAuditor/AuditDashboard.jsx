import React, { useEffect, useState } from 'react';
import AuditService from './AuditService';

import DisplayAllAudits from './DisplayAllAudits';
import AuditSummary from './AuditSummary';
import { useNavigate } from 'react-router-dom';

const AuditDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await AuditService.getAll();
      setLogs(res.data || []);
    } catch (err) {
      console.error('Error fetching audits', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Audit</h3>
      </div>

      <AuditSummary />

      <div className="card mt-3">
        <div className="card-body">
          <DisplayAllAudits />
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;
