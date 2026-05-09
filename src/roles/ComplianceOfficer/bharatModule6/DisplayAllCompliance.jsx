import React, { useEffect, useMemo, useState } from 'react';
import {ComplianceService} from '../../../core/registry';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DisplayAllCompliance.css';
import { SearchBar, StatusBadge, RecordsTable, EmptyState, Loader } from '../../../core/registry';
const DisplayAllCompliance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [emptyData, setEmptyData] = useState(false);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    setLoadError(null);
    setEmptyData(false);
    try {
      const res = await ComplianceService.getAll();
      const data = res?.data ?? [];
      setRecords(data);
      if (!Array.isArray(data) || data.length === 0) {
        setEmptyData(true);
      }
    } catch (err) {
      // Handle 404, network errors and empty datasets by showing EmptyState instead of toast
      if (err?.response?.status === 404) {
        setLoadError(err.response.data?.message || 'Not found');
      } else if (err?.request && !err?.response) {
        setLoadError('Network error: Unable to reach server');
      } else {
        const msg = err?.response?.data?.message || 'Failed to load compliance records';
        toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      const res = await ComplianceService.delete(id);
      const msg = (res && (res.data || res.data === '') ? res.data : 'Compliance deleted');
      toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
      fetchRecords();
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
    let filtered = records || [];
    if (filterText && filterText.trim() !== '') {
      const s = filterText.toLowerCase();
      filtered = filtered.filter((r) => {
        return Object.values(r).some((v) => String(v || '').toLowerCase().includes(s));
      });
    }
    return filtered;
  }, [records, filterText]);

  return (
    <div>
      <SearchBar
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onClear={() => { setFilterText(''); fetchRecords(); }}
        onSubmit={() => { /* filtering is live; kept for compatibility */ }}
        placeholder="Search compliance records..."
      />

      {loading && <Loader message="Loading compliance records..." />}
      {!loading && loadError && (
        <EmptyState title="Failed to load records" message={String(loadError)} />
      )}
      {!loading && !loadError && emptyData && (
        <EmptyState title="No records" message="No compliance records were returned by the server." />
      )}
      {!loading && !loadError && !emptyData && (
        <RecordsTable
          data={displayedRecords}
          columns={[
            { label: 'ID', key: 'complianceId', sortable: true },
            { label: 'Entity', key: 'entityId', sortable: true },
            { label: 'Type', key: 'type', sortable: true },
            { label: 'Result', key: 'result', sortable: true, render: (v) => <StatusBadge type="result" value={v} /> },
            { label: 'Created', key: 'createdAt', sortable: true, render: (v) => (v ? new Date(v).toLocaleString() : '') },
            { label: 'Action', render: (_, row) => (
              <div className="action-td">
                <button className="btn btn-sm btn-link view-btn" onClick={() => navigate(`/compliance/${row.complianceId}`)}>View</button>
                <button className="btn btn-sm btn-outline-primary ms-2 edit-btn" onClick={() => navigate(`/compliance/${row.complianceId}/edit`)}>Edit</button>
              </div>
            ) }
          ]}
        />
      )}
      
    </div>
  );
};

export default DisplayAllCompliance;
