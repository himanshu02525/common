import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './roles/rolesSlice';
import auditReducer from './auditSlice';
import complianceOfficerReducer from './complianceOfficerSlice';
import reportsAnalyticsReducer from './reportsAnalyticsSlice';

const store = configureStore({
  reducer: {
    roles: rolesReducer,
    audit: auditReducer,
    complianceOfficer: complianceOfficerReducer,
    reportsAnalytics: reportsAnalyticsReducer, // Added reportsAnalytics slice
  },
});

export default store;
