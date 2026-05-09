import React, { useEffect, useState } from 'react';
import { getSummary } from '../../axios/roles/auditApi';

const AuditSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => { fetchSummary(); }, []);

  const fetchSummary = async () => {
    try {
      const res = await getSummary();
      setSummary(res || {});
    } catch (err) { console.error(err); }
  };

  return (
    <div className="row mb-4">
      <div className="col-sm-3"><div className="card p-3"><h6>All</h6><h4>{summary.total || 0}</h4></div></div>
      <div className="col-sm-3"><div className="card p-3"><h6>Pending</h6><h4>{summary.PENDING || 0}</h4></div></div>
      <div className="col-sm-3"><div className="card p-3"><h6>In Progress</h6><h4>{summary.IN_PROGRESS || 0}</h4></div></div>
      <div className="col-sm-3"><div className="card p-3"><h6>Completed</h6><h4>{summary.COMPLETED || 0}</h4></div></div>
    </div>
  );
};

export default AuditSummary;
