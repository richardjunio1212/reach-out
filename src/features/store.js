import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import counselingReducer from './counseling/counselingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counseling: counselingReducer,
  },
});
