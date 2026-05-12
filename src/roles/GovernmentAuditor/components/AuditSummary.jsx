import React, { useEffect, useState } from "react";
// Ensure this path correctly points to your API service file
import * as auditApi from "../../../axios/auditApi"; 

const AuditSummary = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAuditSummary = async () => {
    setLoading(true);
    try {
      // Use the helper function from your API service
      const data = await auditApi.getSummary();
      setSummary(data || {});
    } catch (error) {
      console.error("Error fetching audit summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditSummary();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row mb-4">
      {/* Total Card */}
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0 bg-light">
          <h6 className="text-muted">Total Audits</h6>
          <h4 className="fw-bold">{summary?.All ?? 0}</h4>
        </div>
      </div>

      {/* Pending Card */}
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-warning">Pending</h6>
          <h4 className="fw-bold">{summary?.PENDING ?? 0}</h4>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-info">In Progress</h6>
          <h4 className="fw-bold">{summary?.IN_PROGRESS ?? 0}</h4>
        </div>
      </div>

      {/* Completed Card */}
      <div className="col-sm-3">
        <div className="card p-3 shadow-sm border-0">
          <h6 className="text-success">Completed</h6>
          <h4 className="fw-bold">{summary?.COMPLETED ?? 0}</h4>
        </div>
      </div>
    </div>
  );
};

export default AuditSummary;