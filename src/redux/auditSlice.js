import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as auditApi from '../axios/roles/auditApi';

// Async Thunks
export const fetchAudits = createAsyncThunk(
  'audit/fetchAudits',
  async (_, { rejectWithValue }) => {
    try {
      const data = await auditApi.getAll();
      return data || [];
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to load audits';
      return rejectWithValue(msg);
    }
  }
);

export const fetchAuditById = createAsyncThunk(
  'audit/fetchAuditById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await auditApi.getById(id);
      return data || null;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to load audit';
      return rejectWithValue(msg);
    }
  }
);

export const createAudit = createAsyncThunk(
  'audit/createAudit',
  async (auditData, { rejectWithValue }) => {
    try {
      const data = await auditApi.create(auditData);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to create audit';
      return rejectWithValue(msg);
    }
  }
);

export const updateAudit = createAsyncThunk(
  'audit/updateAudit',
  async ({ id, ...changes }, { rejectWithValue }) => {
    try {
      const data = await auditApi.update(id, changes);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to update audit';
      return rejectWithValue(msg);
    }
  }
);

export const getAuditSummary = createAsyncThunk(
  'audit/getAuditSummary',
  async (_, { rejectWithValue }) => {
    try {
      const data = await auditApi.getSummary(); 
      return data || {};
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to load audit summary';
      return rejectWithValue(msg);
    }
  }
);

// Slice
const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    audits: [],
    selected: null,
    summary: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected(state) {
      state.selected = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAudits.fulfilled, (state, action) => {
        state.loading = false;
        state.audits = action.payload;
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAuditById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchAuditById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchAuditById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.selected = null;
      })
      .addCase(createAudit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAudit.fulfilled, (state, action) => {
        state.loading = false;
        state.audits.push(action.payload);
      })
      .addCase(createAudit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSelected } = auditSlice.actions;
export default auditSlice.reducer;