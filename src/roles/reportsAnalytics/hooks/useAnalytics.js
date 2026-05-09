import { useEffect, useState, useCallback } from 'react';
import * as api from '../api/reportApi';

export function useAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [analyticsError, setAnalyticsError] = useState(null);

  const fetchAnalyticsData = useCallback(async () => {
    setIsLoadingAnalytics(true);
    try {
      const responsePayload = await api.getAnalytics();
      setAnalyticsData(responsePayload);
      setAnalyticsError(null);
    } catch (caughtError) {
      setAnalyticsError(caughtError);
    } finally {
      setIsLoadingAnalytics(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  return { analyticsData, isLoadingAnalytics, analyticsError, refetch: fetchAnalyticsData };
}

export default useAnalytics;
