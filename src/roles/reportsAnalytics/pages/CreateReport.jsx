import React from 'react';
import CreateReportForm from '../components/generate/CreateReportForm';
import { useNavigate } from 'react-router-dom';

export default function CreateReport() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Generate Report</h4>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <CreateReportForm defaultScope={undefined} onSuccess={() => navigate('/reports')} />
        </div>
       
      </div>
    </div>
  );
}
