import { useEffect, useState } from 'react';
import {fetchReportById as api} from '../../../axios/reportsAnalyticsApi';
import { parseMetrics } from '../utils/parseMetrics';

export function useReportDetails(reportId) {
  const [reportDetails, setReportDetails] = useState(null);
  const [parsedMetrics, setParsedMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!reportId) {
      setReportDetails(null);
      setParsedMetrics({});
      setIsLoading(false);
      setLoadError(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    api.fetchReportById(reportId)
      .then((responsePayload) => {
        if (!isMounted) return;
        setReportDetails(responsePayload);
        const metricsSource = responsePayload && responsePayload.metrics;
        const normalizedMetrics = parseMetrics(metricsSource);
        setParsedMetrics(normalizedMetrics || {});
      })
      .catch((fetchError) => {
        if (!isMounted) return;
        setLoadError(fetchError);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [reportId]);

  return { reportDetails, parsedMetrics, isLoading, loadError };
}

export default useReportDetails;
