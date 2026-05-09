import React, { useEffect, useState } from 'react';

import {AuditService,AuditSummary,Loader ,RefetchButton}from '../../core/registry';

const AuditDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await AuditService.getAll();
      setLogs(res.data || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
if (loading) return <Loader message="Loading audit..." />;
  
  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Audit</h3> <RefetchButton onClick={fetchLogs} />
      </div>

      <AuditSummary />

    </div>
  );
};

export default AuditDashboard;
