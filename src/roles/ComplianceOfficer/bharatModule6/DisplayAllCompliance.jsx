import React, { useEffect, useMemo, useState } from 'react';
import ComplianceService from './ComplianceService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DisplayAllCompliance.css';
import { SearchBar, StatusBadge, RecordsTable, EmptyState, Loader,RefetchButton,DetailCard } from '../../../core/registry';
import useCompliance from '../../../hooks/roles/useCompliance';
const DisplayAllCompliance = () => {
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const complianceHook = useCompliance();
  const { list: storeRecords, loading: storeLoading, error: storeError, loadList } = complianceHook;
  useEffect(() => {
    loadList();
  }, [loadList]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      const res = await ComplianceService.delete(id);
      const msg = (res && (res.data || res.data === '') ? res.data : 'Compliance deleted');
      toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
      complianceHook.loadList();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to delete compliance record';
      toast.error(typeof msg === 'string' ? msg : 'Failed to delete compliance record');
    }
  };

  // Client-side filtering + sorting helpers
  const getValueByKey = (obj, key) => {
    if (!key) return undefined;
    return key.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
  };



  const displayedRecords = useMemo(() => {
    let filtered = storeRecords || [];
    if (filterText && filterText.trim() !== '') {
      const s = filterText.toLowerCase();
      filtered = filtered.filter((r) => Object.values(r).some((v) => String(v || '').toLowerCase().includes(s)));
    }
    return filtered;
  }, [storeRecords, filterText]);

  return (
    <div>
      <div className="d-flex justify-content-end align-items-end mb-3">
        <RefetchButton onClick={loadList} />
      </div>
      <SearchBar
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onClear={() => { setFilterText(''); loadList(); }}
        onSubmit={() => { /* filtering is live; kept for compatibility */ }}
        placeholder="Search compliance records..."
      />

      {storeLoading && <Loader message="Loading compliance records..." />}
      {!storeLoading && storeError && (
        <EmptyState title="Failed to load records" message={String(storeError)} />
      )}
      {!storeLoading && !storeError && (!storeRecords || storeRecords.length === 0) && (
        <EmptyState title="No records" message="No compliance records were returned by the server." />
      )}
      {!storeLoading && !storeError && storeRecords && storeRecords.length > 0 && (
        <RecordsTable
          data={displayedRecords}
          columns={[
            { label: 'ID', key: 'complianceId', sortable: true },
            { label: 'Entity', key: 'entityId', sortable: true },
            { label: 'Type', key: 'type', sortable: true },
            { label: 'Result', key: 'result', sortable: true, render: (v) => <StatusBadge type="result" value={v} /> },
            { label: 'Created', key: 'createdAt', sortable: true, render: (v) => (v ? new Date(v).toLocaleString() : '') },
            {
              label: 'Action', render: (_, row) => (
                <div className="action-td">
                  <button className="btn btn-sm btn-link view-btn" onClick={() => navigate(`/compliance/${row.complianceId}`)}>View</button>
                  <button className="btn btn-sm btn-outline-primary ms-2 edit-btn" onClick={() => navigate(`/compliance/${row.complianceId}/edit`)}>Edit</button>
                </div>
              )
            }
          ]}
        />
      )}

    </div>
  );
};

export default DisplayAllCompliance;
