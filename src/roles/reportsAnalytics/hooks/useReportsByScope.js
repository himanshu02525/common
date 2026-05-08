import { useEffect, useState } from 'react';
import * as api from '../api/reportApi';

export function useReportsByScope(scope) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!scope) return;
    let mounted = true;
    setLoading(true);
    api.getReportsByScope(scope)
      .then((res) => mounted && setReports(res || []))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [scope]);

  return { reports, loading, error, setReports };
}

export default useReportsByScope;
