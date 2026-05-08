import React from 'react';

const TaxDetails = ({ tax }) => {
  if (!tax) return null;
  return (
    <div className="card record-section">
      <div className="card-body">
        <h6 className="card-title">Tax Details</h6>
        <div className="row">
          <div className="col-sm-4"><strong>Tax ID:</strong> {tax.taxId}</div>
          <div className="col-sm-4"><strong>Entity ID:</strong> {tax.entityId}</div>
          <div className="col-sm-4"><strong>Year:</strong> {tax.year}</div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-4"><strong>Amount:</strong> {tax.amount}</div>
          <div className="col-sm-4"><strong>Status:</strong> {tax.status}</div>
          <div className="col-sm-4"><strong>Created:</strong> {tax.createdAt ? new Date(tax.createdAt).toLocaleString() : ''}</div>
        </div>
      </div>
    </div>
  );
};

export default TaxDetails;
