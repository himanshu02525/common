import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudits } from '../../../redux/auditSlice';
import { Loader, RefetchButton, AuditSummary } from '../../../core/registry';

const AuditDashboard = () => {
  const dispatch = useDispatch();
  const { audits, loading } = useSelector((state) => state.audit);

  useEffect(() => {
    dispatch(fetchAudits());
  }, [dispatch]);

  if (loading) return <Loader message="Loading audit..." />;

  return (
    <div className="container-fluid py-3">
      <div className="d-flex align-items-center mb-3">
        <h3 className="me-auto mb-0">Audit</h3>
        <RefetchButton onClick={() => dispatch(fetchAudits())} />
      </div>

      <AuditSummary />
    </div>
  );
};

export default AuditDashboard;
