import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalyticsData } from '../../../redux/reportsAnalyticsSlice';
import { Dashboard, EmptyState, RefetchButton } from '../../../core/registry';

const AnalyticsDashboardContainer = () => {
  const dispatch = useDispatch();
  const { analyticsData, isLoading, error } = useSelector((state) => state.reportsAnalytics);

  useEffect(() => {
    if (!analyticsData) {
      dispatch(fetchAnalyticsData());
    }
  }, [analyticsData, dispatch]);

  const handleRefetch = () => {
    dispatch(fetchAnalyticsData());
  };

  return (
    <div>
      <RefetchButton onClick={handleRefetch} />
      <Dashboard />
    </div>
  );
};

export default AnalyticsDashboardContainer;