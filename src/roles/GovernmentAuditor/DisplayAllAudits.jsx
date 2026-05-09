import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayAllAudits.css';
import { EmptyState,RefetchButton, Loader, SearchBar, StatusBadge, RecordsTable , AuditService } from '../../core/registry';
import useAudits from '../../hooks/roles/useAudits';
import { toast } from 'react-toastify';

const DisplayAllAudits = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    // StatusBadge used for rendering statuses

    const { loadList } = useAudits();
    useEffect(() => { loadList(); }, [loadList]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await AuditService.getAll();
            const data = res?.data ?? [];
            setLogs(data);
            if (!Array.isArray(data) || data.length === 0) {
                setLoadError('No audits found');
            } else {
                setLoadError(null);
            }
        } catch (err) {
            if (err?.response?.status === 404) {
                setLoadError(err.response.data?.message || 'Not found');
            } else if (err?.request && !err?.response) {
                setLoadError('Network error: Unable to reach server');
            } else {
                const msg = err?.response?.data?.message || 'Failed to load audits';
                toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
            }
        } finally { setLoading(false); }
    };

    /*
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this audit?')) return;
        try {
            const res = await AuditService.delete(id);
            const msg = (res && (res.data || res.data === '') ? res.data : 'Audit deleted');
            toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
            fetchLogs();
        } catch (err) {
            const msg = err?.response?.data?.message || 'Failed to delete audit';
            toast.error(typeof msg === 'string' ? msg : 'Failed to delete audit');
        }
    };
    */

    const getValueByKey = (obj, key) => {
        if (!key) return undefined;
        return key.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
    };

    const auditsHook = useAudits();
    const { list: storeLogs, loading: storeLoading, error: storeError } = auditsHook;
    const displayedRecords = useMemo(() => {
        let filtered = storeLogs || [];
        if (filterText && filterText.trim() !== '') {
            const s = filterText.toLowerCase();
            filtered = filtered.filter((r) => Object.values(r).some((v) => String(v || '').toLowerCase().includes(s)));
        }
        return filtered;
    }, [storeLogs, filterText]);

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
                placeholder="Search audit records..."
            />

            {storeLoading && <Loader message="Loading audits..." />}
            {!storeLoading && storeError && (
                <EmptyState title="Failed to load audits" message={String(storeError)} />
            )}
            {!storeLoading && !storeError && (
                <RecordsTable
                    data={displayedRecords}
                    columns={[
                        { label: 'ID', key: 'auditId', sortable: true },
                        { label: 'Officer Id', key: 'officerId', sortable: true },
                        { label: 'Scope', key: 'scope', sortable: true },
                        { label: 'Status', key: 'status', sortable: true, render: (v) => <StatusBadge value={v} /> },
                        { label: 'Created', key: 'createdAt', sortable: true, render: (v) => (v ? new Date(v).toLocaleString() : '') },
                        { label: 'Findings', key: 'findings', render: (v) => <div className="truncate-cell">{v}</div> },
                        {
                            label: 'Actions', render: (_, row) => (
                                <div className="action-td">
                                    <button className="btn btn-outline-info view-btn" onClick={() => navigate(`/audit/${row.auditId}`)}>View</button>
                                    <button className="btn btn-sm btn-primary ms-2 edit-btn" onClick={() => navigate(`/audit/${row.auditId}/edit`)}>Edit</button>
                                    {/* <button className="btn btn-sm btn-outline-danger ms-2 delete-btn" onClick={() => handleDelete(row.auditId)}>Delete</button> */}
                                </div>
                            )
                        }
                    ]}
                />
            )}

        </div>
    );
};

export default DisplayAllAudits;
