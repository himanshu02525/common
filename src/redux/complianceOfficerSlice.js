import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as complianceApi from '../axios/roles/complianceApi';

// Async Thunks
export const fetchComplianceRecords = createAsyncThunk(
  'complianceOfficer/fetchComplianceRecords',
  async (_, { rejectWithValue }) => {
    try {
      const data = await complianceApi.getAll();
      return data || [];
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to load compliance records';
      return rejectWithValue(msg);
    }
  }
);

export const fetchComplianceRecordById = createAsyncThunk(
  'complianceOfficer/fetchComplianceRecordById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await complianceApi.getById(id);
      return data || null;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to load compliance record';
      return rejectWithValue(msg);
    }
  }
);

export const createComplianceRecord = createAsyncThunk(
  'complianceOfficer/createComplianceRecord',
  async (recordData, { rejectWithValue }) => {
    try {
      const data = await complianceApi.create(recordData);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to create compliance record';
      return rejectWithValue(msg);
    }
  }
);

export const updateComplianceRecord = createAsyncThunk(
  'complianceOfficer/updateComplianceRecord',
  async ({ id, ...changes }, { rejectWithValue }) => {
    try {
      const data = await complianceApi.update(id, changes);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to update compliance record';
      return rejectWithValue(msg);
    }
  }
);

export const deleteComplianceRecord = createAsyncThunk(
  'complianceOfficer/deleteComplianceRecord',
  async (id, { rejectWithValue }) => {
    try {
      await complianceApi.remove(id);
      return id;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to delete compliance record';
      return rejectWithValue(msg);
    }
  }
);

export const getComplianceSummary = createAsyncThunk(
  'complianceOfficer/getComplianceSummary',
  async (_, { rejectWithValue }) => {
    try {
      const data = await complianceApi.summary();
      return data || {};
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to load compliance summary';
      return rejectWithValue(msg);
    }
  }
);

// Slice
const initialState = {
  records: [],
  selected: null,
  summary: {},
  loading: false,
  error: null,
};

const complianceOfficerSlice = createSlice({
  name: 'complianceOfficer',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplianceRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplianceRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchComplianceRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchComplianceRecordById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchComplianceRecordById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchComplianceRecordById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.selected = null;
      })
      .addCase(createComplianceRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComplianceRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(createComplianceRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateComplianceRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComplianceRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.records.findIndex((record) => record.complianceId === action.payload.complianceId);
        if (index !== -1) state.records[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(updateComplianceRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteComplianceRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplianceRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((record) => record.complianceId !== action.payload);
      })
      .addCase(deleteComplianceRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getComplianceSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplianceSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getComplianceSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSelected } = complianceOfficerSlice.actions;

export default complianceOfficerSlice.reducer;