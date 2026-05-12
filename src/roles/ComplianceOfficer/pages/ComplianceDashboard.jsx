import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplianceRecords } from '../../../redux/complianceOfficerSlice';
import { Loader, RefetchButton, ComplianceSummary } from '../../../core/registry';

const ComplianceDashboard = () => {
  const dispatch = useDispatch();
  const { records, loading } = useSelector((state) => state.complianceOfficer);

  useEffect(() => {
    dispatch(fetchComplianceRecords());
  }, [dispatch]);
  
useEffect(() => {
    fetchComplianceRecords();
  }, []);
  if (loading) return <Loader message="Loading compliance..." />;

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Compliance Dashboard</h3>
        <RefetchButton onClick={() => dispatch(fetchComplianceRecords())} />
      </div>

      <ComplianceSummary compliance={records} />
    </div>
  );
};

export default ComplianceDashboard;