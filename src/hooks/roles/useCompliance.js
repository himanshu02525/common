import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchComplianceRecords, fetchComplianceRecordById } from '../../redux/complianceOfficerSlice';

export default function useCompliance() {
  const dispatch = useDispatch();
  const compliance = useSelector((s) => s.complianceOfficer);

  const loadList = useCallback(() => dispatch(fetchComplianceRecords()), [dispatch]);
  const loadById = useCallback((id) => dispatch(fetchComplianceRecordById(id)), [dispatch]);
  const clearSelected = useCallback(() => dispatch({ type: 'complianceOfficer/clearSelected' }), [dispatch]);

  return {
    list: compliance.records,
    loading: compliance.loading,
    error: compliance.error,
    selected: compliance.selected,
    loadList,
    loadById,
    clearSelected,
  };
}
