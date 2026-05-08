import React, { useEffect, useMemo, useState } from 'react';
import ComplianceService from './ComplianceService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DisplayAllCompliance.css';
import RecordsTable from '../../../components/common/RecordsTable';
import StatusBadge from '../../../components/common/StatusBadge';
import SearchBar from '../../../components/common/SearchBar';

const DisplayAllCompliance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await ComplianceService.getAll();
      setRecords(res.data || []);
    } catch (err) {
     toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
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
      const msg = err?.response?.data?.message || 'Delete failed';
      toast.error(typeof msg === 'string' ? msg : 'Delete failed');
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

      {loading ? <div>Loading...</div> : (
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
