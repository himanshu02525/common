import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchComplianceList, fetchComplianceById, clearComplianceSelected } from '../../redux/roles/rolesSlice';

export default function useCompliance() {
  const dispatch = useDispatch();
  const compliance = useSelector((s) => s.roles.compliance);

  const loadList = useCallback(() => dispatch(fetchComplianceList()), [dispatch]);
  const loadById = useCallback((id) => dispatch(fetchComplianceById(id)), [dispatch]);
  const clearSelected = useCallback(() => dispatch(clearComplianceSelected()), [dispatch]);

  return {
    list: compliance.list,
    loading: compliance.loading,
    error: compliance.error,
    selected: compliance.selected,
    loadList,
    loadById,
    clearSelected,
  };
}
