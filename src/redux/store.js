import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './roles/rolesSlice';

const store = configureStore({
  reducer: {
    roles: rolesReducer,
  },
});

export default store;
