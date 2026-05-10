import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DisplayOneAudit.css';
import { StatusBadge, DetailCard, EmptyState, Loader } from '../../core/registry';
import { getById } from '../../axios/roles/auditApi';

const DisplayOneAudit = ({ audit: propAudit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(propAudit || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!propAudit && id) fetchAudit(id);
  }, [id, propAudit]);

  const fetchAudit = async (aid) => {
    setLoading(true);
    try {
      const data = await getById(aid);
      setAudit(data);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      const apiMsg = err?.response?.data?.message || err?.message || 'Unknown error';
      setErrorMsg(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message='Loading audit record...'/>;
  if (!audit) return <EmptyState message={errorMsg} />
        

  return (
    <div className="audit-container">
      <DetailCard
        title={`Audit #${audit.auditId}`}
        subtitle={`Scope: ${audit.scope}`}
        badge={<StatusBadge value={audit.status} />}
        date={audit.createdAt ? new Date(audit.createdAt).toLocaleString() : ''}
        onBack={() => navigate(-1)}
        actions={
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/audit/${audit.auditId}/edit`)}
          >
            Update
          </button>
        }
      >
        <div className="audit-grid">
          <div className="field">
            <strong>Officer ID</strong>
            <div>{audit.officerId}</div>
          </div>
          <div className="field">
            <strong>Audit ID</strong>
            <div>{audit.auditId}</div>
          </div>
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
