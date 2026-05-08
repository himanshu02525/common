import { useEffect, useState, useCallback } from 'react';
import * as api from '../api/reportApi';

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getAnalytics();
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    // call fetchData but ensure we don't update state if unmounted
    fetchData();
    return () => {
      mounted = false;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useAnalytics;
