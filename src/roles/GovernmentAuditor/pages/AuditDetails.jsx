import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuditById } from '../../../redux/auditSlice';
import { Loader, EmptyState, DisplayOneAudit } from '../../../core/registry';

const AuditDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [audit, setAudit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchAudit = useCallback(async (aid) => {
        setLoading(true);
        try {
            const resultAction = await dispatch(fetchAuditById(aid));
            const data = resultAction.payload;

            setAudit(data);
            setErrorMsg('');
        } catch (err) {
            const apiMsg = err?.response?.data?.message || err?.message || 'Unknown error';
            setErrorMsg(apiMsg);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (id) fetchAudit(id);
    }, [id, fetchAudit]);

    if (loading) return <Loader message="Loading audit record..." />;

    if (!audit) {
        return <EmptyState message={errorMsg || "Record not found"} />;
    }

    return (
        <DisplayOneAudit
            audit={audit}
            onRefresh={() => fetchAudit(id)}
        />
    );
};

export default AuditDetails;