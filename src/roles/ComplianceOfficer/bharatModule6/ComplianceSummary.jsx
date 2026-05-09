import React, { useEffect, useState } from 'react';
import {ComplianceService} from '../../../core/registry';

const ComplianceSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await ComplianceService.getSummary();
      setSummary(res.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-sm-3">
        <div className="card p-3">
          <h6>All</h6>
          <h4>{summary.total || 0}</h4>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card p-3">
          <h6>Pass</h6>
          <h4>{summary.PASS || 0}</h4>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card p-3">
          <h6>Fail</h6>
          <h4>{summary.FAIL || 0}</h4>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card p-3">
          <h6>In Progress</h6>
          <h4>{summary.IN_PROGRESS || 0}</h4>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSummary;
