import React from 'react';
import { CreateReportForm } from '../../../core/registry';
export default function CreateReport() {

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Generate Report</h4>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <CreateReportForm  />
        </div>
       
      </div>
    </div>
  );
}
