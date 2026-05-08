import React from 'react';

const CitizenBusinessDetails = ({ entity }) => {
  if (!entity) return null;
  return (
    <div className="card record-section">
      <div className="card-body">
        <h6 className="card-title">Citizen / Business Details</h6>
        <div className="row">
          <div className="col-sm-4"><strong>Entity ID:</strong> {entity.entityId}</div>
          <div className="col-sm-8"><strong>Name:</strong> {entity.name}</div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-4"><strong>Type:</strong> {entity.type}</div>
          <div className="col-sm-8"><strong>Address:</strong> {entity.address}</div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6"><strong>Contact:</strong> {entity.contactInfo}</div>
          <div className="col-sm-6"><strong>Status:</strong> {entity.status}</div>
        </div>
      </div>
    </div>
  );
};

export default CitizenBusinessDetails;
