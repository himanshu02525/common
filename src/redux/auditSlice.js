import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as auditApi from "../axios/auditApi";

export const fetchAudits = createAsyncThunk(
  "audit/fetchAudits",
  async (_, { rejectWithValue }) => {
    try {
      return await auditApi.getAll();
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const fetchAuditById = createAsyncThunk(
  "audit/fetchAuditById",
  async (id, { rejectWithValue }) => {
    try {
      return await auditApi.getById(id);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const createAudit = createAsyncThunk(
  "audit/createAudit",
  async (data, { rejectWithValue }) => {
    try {
      return await auditApi.create(data);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const updateAudit = createAsyncThunk(
  "audit/updateAudit",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      return await auditApi.update(id, data);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const getAuditSummary = createAsyncThunk(
  "audit/getAuditSummary",
  async (_, { rejectWithValue }) => {
    try {
      return await auditApi.getSummary();
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

const auditSlice = createSlice({
  name: "audit",
  initialState: {
    audits: [],
    selected: null,
    summary: {},
    loading: false,
    error: null,
  },
  reducers: {},
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
        state.error = action.payload;
      })
      .addCase(fetchAuditById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createAudit.fulfilled, (state, action) => {
        state.audits.push(action.payload);
      })
      .addCase(updateAudit.fulfilled, (state, action) => {
        const i = state.audits.findIndex(
          (a) => a.auditId === action.payload.auditId
        );
        if (i !== -1) state.audits[i] = action.payload;
      });
  },
});

export default auditSlice.reducer;