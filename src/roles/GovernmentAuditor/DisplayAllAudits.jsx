import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayAllAudits.css';
import { EmptyState, RefetchButton, Loader, SearchBar, StatusBadge, RecordsTable } from '../../core/registry';
import { getAll } from '../../axios/roles/auditApi';
import useAudits from '../../hooks/roles/useAudits';
import { toast } from 'react-toastify';

const DisplayAllAudits = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const data = await getAll();
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const displayedRecords = useMemo(() => {
        let filtered = logs || [];
        if (filterText && filterText.trim() !== '') {
            const s = filterText.toLowerCase();
            filtered = filtered.filter((r) =>
                Object.values(r).some((v) => String(v || '').toLowerCase().includes(s))
            );
        }
        return filtered;
    }, [logs, filterText]);

    return (
        <div>
            <div className="d-flex justify-content-end align-items-end mb-3">
                <RefetchButton onClick={fetchLogs} />
            </div>
            <SearchBar
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                onClear={() => {
                    setFilterText('');
                    fetchLogs();
                }}
                onSubmit={() => {
                    /* filtering is live; kept for compatibility */
                }}
                placeholder="Search audit records..."
            />

            {loading && <Loader message="Loading audits..." />}
            {!loading && loadError && (
                <EmptyState title="Failed to load audits" message={String(loadError)} />
            )}
            {!loading && !loadError && (
                <RecordsTable
                    data={displayedRecords}
                    columns={[
                        { label: 'ID', key: 'auditId', sortable: true },
                        { label: 'Officer Id', key: 'officerId', sortable: true },
                        { label: 'Scope', key: 'scope', sortable: true },
                        {
                            label: 'Status',
                            key: 'status',
                            sortable: true,
                            render: (v) => <StatusBadge value={v} />,
                        },
                        {
                            label: 'Created',
                            key: 'createdAt',
                            sortable: true,
                            render: (v) => (v ? new Date(v).toLocaleString() : ''),
                        },
                        {
                            label: 'Findings',
                            key: 'findings',
                            render: (v) => <div className="truncate-cell">{v}</div>,
                        },
                        {
                            label: 'Actions',
                            render: (_, row) => (
                                <div className="action-td">
                                    <button
                                        className="btn btn-outline-info view-btn"
                                        onClick={() => navigate(`/audit/${row.auditId}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-sm btn-primary ms-2 edit-btn"
                                        onClick={() => navigate(`/audit/${row.auditId}/edit`)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                />
            )}
        </div>
    );
};

export default DisplayAllAudits;
