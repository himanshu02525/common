import React from 'react';

const SubsidyDetails = ({ subsidy }) => {
  if (!subsidy) return null;
  return (
    <div className="card record-section">
      <div className="card-body">
        <h6 className="card-title">Subsidy Details</h6>
        <div className="row">
          <div className="col-sm-4"><strong>Subsidy ID:</strong> {subsidy.subsidyId}</div>
          <div className="col-sm-4"><strong>Entity ID:</strong> {subsidy.entityId}</div>
          <div className="col-sm-4"><strong>Program ID:</strong> {subsidy.programId}</div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-4"><strong>Amount:</strong> {subsidy.amount}</div>
          <div className="col-sm-4"><strong>Date:</strong> {subsidy.date ? new Date(subsidy.date).toLocaleDateString() : ''}</div>
          <div className="col-sm-4"><strong>Status:</strong> {subsidy.status}</div>
        </div>
      </div>
    </div>
  );
};

export default SubsidyDetails;
