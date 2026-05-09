import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './roles/rolesSlice';
import auditReducer from './auditSlice';
import complianceOfficerReducer from './complianceOfficerSlice';

const store = configureStore({
  reducer: {
    roles: rolesReducer,
    audit: auditReducer,
    complianceOfficer: complianceOfficerReducer,
  },
});

export default store;
