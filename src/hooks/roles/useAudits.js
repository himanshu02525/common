import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchAuditsList, fetchAuditById, clearAuditsSelected } from '../../redux/roles/rolesSlice';

export default function useAudits() {
  const dispatch = useDispatch();
  const audits = useSelector((s) => s.roles.audits);

  const loadList = useCallback(() => dispatch(fetchAuditsList()), [dispatch]);
  const loadById = useCallback((id) => dispatch(fetchAuditById(id)), [dispatch]);
  const clearSelected = useCallback(() => dispatch(clearAuditsSelected()), [dispatch]);

  return {
    list: audits.list,
    loading: audits.loading,
    error: audits.error,
    selected: audits.selected,
    loadList,
    loadById,
    clearSelected,
  };
}
