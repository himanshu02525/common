import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAnalytics } from '../axios/reportsAnalyticsApi';

// Initial state
const initialState = {
  analyticsData: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching analytics data
export const fetchAnalyticsData = createAsyncThunk(
  'reportsAnalytics/fetchAnalyticsData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAnalytics();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const reportsAnalyticsSlice = createSlice({
  name: 'reportsAnalytics',
  initialState,
  reducers: {
    clearAnalyticsData(state) {
      state.analyticsData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analyticsData = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalyticsData } = reportsAnalyticsSlice.actions;
export default reportsAnalyticsSlice.reducer;