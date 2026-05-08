import { useEffect, useState } from 'react';
import * as api from '../api/reportApi';
import { parseMetrics } from '../utils/parseMetrics';

export function useReportDetails(id) {
  const [report, setReport] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    api.getReportById(id)
      .then((res) => {
        if (!mounted) return;
        setReport(res);
        const parsed = parseMetrics(res.metrics);
        setMetrics(parsed || {});
      })
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  return { report, metrics, loading, error };
}

export default useReportDetails;
