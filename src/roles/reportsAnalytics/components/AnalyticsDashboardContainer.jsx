import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalytics } from '../../../redux/reportsAnalyticsSlice';
import AnalyticsDashboard from '../pages/ReportsDashboard';

const AnalyticsDashboardContainer = () => {
  const dispatch = useDispatch();
  const { analyticsData, isLoading, error } = useSelector((state) => state.reportsAnalytics);

  const handleRefetch = () => {
    dispatch(fetchAnalytics());
  };

  return (
    <AnalyticsDashboard
      analyticsData={analyticsData}
      isLoadingAnalytics={isLoading}
      analyticsError={error}
      refetch={handleRefetch}
    />
  );
};

export default AnalyticsDashboardContainer;