import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuditService from './AuditService';
import './DisplayOneAudit.css';
import EmptyState from '../../components/common/EmptyState';
import DetailCard from '../../components/common/DetailCard';
import StatusBadge from '../../components/common/StatusBadge';

const DisplayOneAudit = ({ audit: propAudit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(propAudit || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // use StatusBadge component

  useEffect(() => {
    if (!propAudit && id) fetchAudit(id);
  }, [id, propAudit]);

  const fetchAudit = async (aid) => {
    setLoading(true);
    try {
      const res = await AuditService.getById(aid);
      setAudit(res.data);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      const apiMsg = err?.response?.data?.message || err?.message || 'Unknown error';
      setErrorMsg(apiMsg);
    } finally { setLoading(false); }
  };

  if (loading) return <div>Loading...</div>;
  if (!audit) {
    const title = errorMsg && String(errorMsg).includes('Not Found') ? 'Audit Not Found' : (errorMsg && String(errorMsg).toLowerCase().includes('network') ? 'Network Error' : 'No Audit');
    const message = errorMsg || 'The requested audit record could not be found.';
    const action = (
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
        {id && <button className="btn btn-primary" onClick={() => fetchAudit(id)}>Retry</button>}
      </div>
    );
    return <EmptyState title={title} message={message} action={action} />;
  }

  return (
    <div className="audit-container">
      <DetailCard
        title={`Audit #${audit.auditId}`}
        subtitle={`Scope: ${audit.scope}`}
        badge={<StatusBadge value={audit.status} />}
        date={audit.createdAt ? new Date(audit.createdAt).toLocaleString() : ''}
        onBack={() => navigate(-1)}
        actions={<button className="btn btn-sm btn-primary" onClick={() => navigate(`/audit/${audit.auditId}/edit`)}>Update</button>}
      >
        <div className="audit-grid">
          <div className="field"><strong>Officer ID</strong><div>{audit.officerId}</div></div>
          <div className="field"><strong>Audit ID</strong><div>{audit.auditId}</div></div>
        </div>

        <div className="mt-3">
          <h6>Findings</h6>
          <div className="notes-box wrap-text">{audit.findings || '—'}</div>
        </div>
      </DetailCard>
    </div>
  );
};

export default DisplayOneAudit;
