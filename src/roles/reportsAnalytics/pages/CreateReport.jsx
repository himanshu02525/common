import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateReportForm } from '../../../core/registry';


export default function CreateReport() {
  const navigate = useNavigate();
  const handleReportSuccess = (data) => {
    if (data?.reportId) {
      navigate(`/reports/${data.reportId}`);
    } else {
      navigate('/reports/list');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Generate New Report</h4>
          <p className="text-muted small mb-0">
            Configure parameters to build a custom analytics report.
          </p>
        </div>
        <button 
          className="btn btn-sm btn-outline-secondary px-3"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-12">
          <CreateReportForm  />
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <small className="text-muted">
          Reports may take a few moments to process depending on the selected scope.
        </small>
      </div>
    </div>
  );
}