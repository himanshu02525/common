import React from 'react';

const FundingProgramDetails = ({ program }) => {
  if (!program) return null;
  return (
    <div className="card record-section">
      <div className="card-body">
        <h6 className="card-title">Funding Program Details</h6>
        <div className="row">
          <div className="col-sm-6"><strong>Program ID:</strong> {program.programId}</div>
          <div className="col-sm-6"><strong>Title:</strong> {program.title}</div>
        </div>
        <div className="row mt-2">
          <div className="col-12"><strong>Description:</strong> {program.description}</div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-4"><strong>Budget:</strong> {program.budget}</div>
          <div className="col-sm-4"><strong>Status:</strong> {program.status}</div>
        </div>
      </div>
    </div>
  );
};

export default FundingProgramDetails;
