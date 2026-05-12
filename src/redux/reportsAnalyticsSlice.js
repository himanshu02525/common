import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAll, getAnalytics, fetchReportById } from '../axios/reportsAnalyticsApi'; 

const initialState = {
  analyticsData: null,
  reportsList: [],
  currentReport: null,
  isLoading: false,
  error: null,
};

export const fetchAnalyticsData = createAsyncThunk(
  'reportsAnalytics/fetchAnalyticsData',
  async (_, { rejectWithValue }) => {
    try {
      return await getAnalytics();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllReports = createAsyncThunk(
  'reportsAnalytics/fetchAllReports',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAll();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getSingleReport = createAsyncThunk(
  'reportsAnalytics/getSingleReport',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchReportById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportsAnalyticsSlice = createSlice({
  name: 'reportsAnalytics',
  initialState,
  reducers: {
    clearAnalyticsData(state) {
      state.analyticsData = null;
      state.error = null;
    },
    clearCurrentReport(state) {
      state.currentReport = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle Analytics
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
      })
      // Handle Fetch All Reports
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.reportsList = action.payload;
      })
      // Handle Single Report
      .addCase(getSingleReport.fulfilled, (state, action) => {
        state.currentReport = action.payload;
      });
  },
});

export const { clearAnalyticsData, clearCurrentReport } = reportsAnalyticsSlice.actions;
export default reportsAnalyticsSlice.reducer;