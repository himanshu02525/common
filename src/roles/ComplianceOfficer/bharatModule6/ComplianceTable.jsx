import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';
import {RecordsTable,StatusBadge,ComplianceService} from '../../../core/registry';
  // use StatusBadge component for result display

const ComplianceTable = ({ records = [], loading = false, onRefresh }) => {
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openDetails = (rec) => setSelected(rec);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this compliance record?')) return;
    try {
      await ComplianceService.delete(id);
      onRefresh && onRefresh();
    } catch (err) {
      // delete failed - handled via UI toast in caller if desired
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <RecordsTable
          data={records}
          columns={[
            { label: 'ID', key: 'complianceId' },
            { label: 'Entity ID', key: 'entityId' },
            { label: 'Type', key: 'type' },
              { label: 'Result', key: 'result', render: (v) => <StatusBadge type="result" value={v} /> },
            { label: 'Created Date', key: 'createdAt', render: (v) => (v ? new Date(v).toLocaleString() : '') },
            { label: 'Actions', render: (_, row) => (
              <div>
                <button className="btn btn-sm btn-link" onClick={() => openDetails(row)}>Details</button>
                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(row.complianceId)}>Delete</button>
              </div>
            ) }
          ]}
        />
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Compliance #${selected?.complianceId || ''}`} size="md">
        {selected && (
          <div>
            <p><strong>Entity:</strong> {selected.entityId}</p>
            <p><strong>Reference:</strong> {selected.referenceId}</p>
            <p><strong>Type:</strong> {selected.type}</p>
            <p><strong>Result:</strong> {selected.result}</p>
            <p><strong>Created:</strong> {selected.createdAt ? new Date(selected.createdAt).toLocaleString() : ''}</p>
            <hr />
            {selected.type === 'TAX' && selected.taxResponseDTO && (
              <div>
                <h6>Tax Response</h6>
                <p>Tax ID: {selected.taxResponseDTO.taxId}</p>
                <p>Year: {selected.taxResponseDTO.year}</p>
                <p>Amount: {selected.taxResponseDTO.amount}</p>
                <p>Status: {selected.taxResponseDTO.status}</p>
              </div>
            )}

            {selected.type === 'SUBSIDY' && selected.subsidyResponse && (
              <div>
                <h6>Subsidy</h6>
                <p>Subsidy ID: {selected.subsidyResponse.subsidyId}</p>
                <p>Amount: {selected.subsidyResponse.amount}</p>
                <p>Date: {selected.subsidyResponse.date}</p>
                <p>Program ID: {selected.subsidyResponse.programId}</p>
              </div>
            )}

            {selected.type === 'PROGRAM' && selected.financialProgramResponse && (
              <div>
                <h6>Program</h6>
                <p>Program ID: {selected.financialProgramResponse.programId}</p>
                <p>Title: {selected.financialProgramResponse.title}</p>
                <p>Budget: {selected.financialProgramResponse.budget}</p>
              </div>
            )}

            <div className="mt-3">
              <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComplianceTable;
