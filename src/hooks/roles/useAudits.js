import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchAudits, fetchAuditById } from '../../redux/auditSlice';

export default function useAudits() {
  const dispatch = useDispatch();
  const audits = useSelector((s) => s.audit);

  const loadList = useCallback(() => dispatch(fetchAudits()), [dispatch]);
  const loadById = useCallback((id) => dispatch(fetchAuditById(id)), [dispatch]);
  const clearSelected = useCallback(() => dispatch({ type: 'audit/clearSelected' }), [dispatch]);

  return {
    list: audits.audits,
    loading: audits.loading,
    error: audits.error,
    selected: audits.selected,
    loadList,
    loadById,
    clearSelected,
  };
}
