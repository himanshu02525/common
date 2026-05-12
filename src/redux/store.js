import { configureStore } from '@reduxjs/toolkit';
import auditReducer from './auditSlice';
import complianceOfficerReducer from './complianceOfficerSlice';
import reportsAnalyticsReducer from './reportsAnalyticsSlice';
const store = configureStore({
  reducer: {
    audit: auditReducer,
    complianceOfficer: complianceOfficerReducer,
    reportsAnalytics: reportsAnalyticsReducer, 
  },
});

export default store;
