import React, { useEffect, useState } from 'react';
import * as complianceApi from "../../../axios/complianceApi";

const ComplianceSummary = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await complianceApi.getSummary();
      setSummary(data || {});
    } catch (err) {
      console.error('Error fetching compliance summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return <div className="text-center p-3">Loading Summary...</div>;
  }

  return (
    <div className="row mb-4">
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-muted">All</h6>
          <h4 className="fw-bold">{summary.All ?? 0}</h4>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-warning">Pending</h6>
          <h4 className="fw-bold">{summary.PENDING ?? 0}</h4>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-info">In Progress</h6>
          <h4 className="fw-bold">{summary.IN_PROGRESS ?? 0}</h4>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-success">Completed</h6>
          <h4 className="fw-bold">{summary.COMPLETED ?? 0}</h4>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSummary;