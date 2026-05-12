import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DisplayOneRecord.css';
import * as complianceApi from "../../../axios/complianceApi";
import { 
  EmptyState, 
  Loader, 
  DetailCard, 
  StatusBadge, 
  TaxDetails, 
  SubsidyDetails, 
  FundingProgramDetails, 
  CitizenBusinessDetails 
} from '../../../core/registry';

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
      const data = await complianceApi.getById(rid);
      if (!data) {
        setErrorMsg(`No data returned for ID: ${rid}`);
        setRecord(null);
      } else {
        setRecord(data);
        setErrorMsg('');
      }
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.message || 'Failed to fetch record';
      setErrorMsg(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Fetching record details..." />;
  if (!record && errorMsg) return <EmptyState message={errorMsg} />;
  if (!record) return null;

  return (
    <div className="record-container py-3">
      <div className="mb-3">
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => navigate(-1)}
        >
          &larr; Back to List
        </button>
      </div>

      <DetailCard
        title={`Compliance #${record.complianceId}`}
        subtitle={`${record.type} Verification • Entity ${record.entityId}`}
        badge={<StatusBadge type="result" value={record.result} />}
        date={record.createdAt ? new Date(record.createdAt).toLocaleString() : ''}
        actions={
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate(`/compliance/${record.complianceId}/edit`)}
          >
            Update Status
          </button>
        }
      >
        <div className="row g-3">
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block text-uppercase fw-bold">Reference ID</small>
              <span className="fs-5">{record.referenceId}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block text-uppercase fw-bold">Entity ID</small>
              <span className="fs-5">{record.entityId}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block text-uppercase fw-bold">Type</small>
              <span className="fs-5">{record.type}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h6 className="fw-bold text-uppercase small text-muted">Auditor Notes</h6>
          <div className="p-3 border rounded bg-white notes-box wrap-text">
            {record.notes || <span className="text-muted italic">No notes provided for this record.</span>}
          </div>
        </div>

        {/* Dynamic Detail Sections Based on Type */}
        <div className="mt-4">
          {record.type === 'TAX' && record.taxResponseDTO && (
            <div className="mt-3">
              <TaxDetails tax={record.taxResponseDTO} />
            </div>
          )}
          
          {record.type === 'SUBSIDY' && record.subsidyResponse && (
            <div className="mt-3">
              <SubsidyDetails subsidy={record.subsidyResponse} />
            </div>
          )}
          
          {(record.type === 'FUNDING_PROGRAM' || record.type === 'PROGRAM') && record.financialProgramResponse && (
            <div className="mt-3">
              <FundingProgramDetails program={record.financialProgramResponse} />
            </div>
          )}
          
          {record.citizenBusinessResponseDTO && (
            <div className="mt-4 border-top pt-3">
              <h6 className="fw-bold mb-3">Entity Information</h6>
              <CitizenBusinessDetails entity={record.citizenBusinessResponseDTO} />
            </div>
          )}
        </div>
      </DetailCard>
    </div>
  );
};

export default DisplayOneRecord;