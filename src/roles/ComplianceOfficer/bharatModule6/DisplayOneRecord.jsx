import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DisplayOneRecord.css';
import {EmptyState,ComplianceService, Loader,DetailCard,StatusBadge ,TaxDetails } from '../../../core/registry';
const DisplayOneRecord = ({ record: propRecord }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(propRecord || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!propRecord && id) {
      fetchRecord(id);
    }
  }, [id, propRecord]);

  const fetchRecord = async (rid) => {
    setLoading(true);
    try {
      const res = await ComplianceService.getById(rid);
      if (!res || !res.data) {
        setErrorMsg(`No data returned from API for id=${rid}`);
        setRecord(null);
      } else {
        setRecord(res.data);
        setErrorMsg('');
      }
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.message || 'Unknown error';
      setErrorMsg(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader/>;
  if (!record) return <EmptyState   message={errorMsg} />
  return (
    <div className="record-container">
      <DetailCard
        title={`Compliance #${record.complianceId}`}
        subtitle={`${record.type} • ${record.entityId}`}
        badge={<StatusBadge type="result" value={record.result} />}
        date={record.createdAt ? new Date(record.createdAt).toLocaleString() : ''}
       actions={<button className="btn btn-sm btn-primary" onClick={() => navigate(`/compliance/${record.complianceId}/edit`)}>Update</button>}
      >
        <div className="record-grid">
          <div className="field"><strong>Reference ID</strong><div>{record.referenceId}</div></div>
          <div className="field"><strong>Entity ID</strong><div>{record.entityId}</div></div>
          <div className="field"><strong>Type</strong><div>{record.type}</div></div>
          <div className="field"><strong>Result</strong><div><StatusBadge type="result" value={record.result} /></div></div>
        </div>

        <div className="mt-3">
          <h6>Notes</h6>
          <div className="notes-box wrap-text">{record.notes || '—'}</div>
        </div>

        {record.type === 'TAX' && record.taxResponseDTO && (
          <div className="card-body"><TaxDetails tax={record.taxResponseDTO} /></div>
        )}
        {record.type === 'SUBSIDY' && record.subsidyResponse && (
        <div className="card-body"><SubsidyDetails subsidy={record.subsidyResponse} /></div>
        )}
        {record.type === 'FUNDING_PROGRAM' && record.financialProgramResponse && (
        <div className="card-body"><FundingProgramDetails program={record.financialProgramResponse} /></div>
        )}
        {record.citizenBusinessResponseDTO && (
        <div className="card-body"><CitizenBusinessDetails entity={record.citizenBusinessResponseDTO} /></div>
        )}
      </DetailCard>
    </div>
  );

}
export default DisplayOneRecord;
