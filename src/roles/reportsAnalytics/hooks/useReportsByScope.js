import { useEffect, useState } from 'react';
import * as api from '../api/reportApi';

export function useReportsByScope(scope) {
  const [scopedReports, setScopedReports] = useState([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // fetcher can be called to (re)load reports for the current scope
  const fetchReports = async () => {
    if (!scope) {
      setScopedReports([]);
      setIsLoadingReports(false);
      setLoadError(null);
      return;
    }

    let isMounted = true;
    setIsLoadingReports(true);
    setLoadError(null);

    try {
      const responsePayload = await api.getReportsByScope(scope);
      if (!isMounted) return;
      setScopedReports(responsePayload || []);
    } catch (fetchError) {
      if (!isMounted) return;
      setLoadError(fetchError);
    } finally {
      if (!isMounted) return;
      setIsLoadingReports(false);
    }

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    // initial load
    let cancelled = false;
    (async () => {
      if (!scope) {
        setScopedReports([]);
        setIsLoadingReports(false);
        setLoadError(null);
        return;
      }
      setIsLoadingReports(true);
      setLoadError(null);
      try {
        const responsePayload = await api.getReportsByScope(scope);
        if (cancelled) return;
        setScopedReports(responsePayload || []);
      } catch (fetchError) {
        if (cancelled) return;
        setLoadError(fetchError);
      } finally {
        if (cancelled) return;
        setIsLoadingReports(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [scope]);

  return { scopedReports, isLoadingReports, loadError, setScopedReports, refetch: fetchReports };
}

export default useReportsByScope;
