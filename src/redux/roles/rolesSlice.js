import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as complianceApi from '../../axios/roles/complianceApi';
import * as auditApi from '../../axios/roles/auditApi';

// Compliance thunks
export const fetchComplianceList = createAsyncThunk('roles/fetchComplianceList', async (_, { rejectWithValue }) => {
    try {
        const res = await complianceApi.getAll();
        return res ?? [];
    } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Failed to load compliance list';
        return rejectWithValue(msg);
    }
});
export const fetchComplianceById = createAsyncThunk('roles/fetchComplianceById', async (id, { rejectWithValue }) => {
    try {
        const res = await complianceApi.getById(id);
        return res ?? null;
    } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Failed to load compliance record';
        return rejectWithValue(msg);
    }
});

// Audits thunks
export const fetchAuditsList = createAsyncThunk('roles/fetchAuditsList', async (_, { rejectWithValue }) => {
    try {
        const res = await auditApi.getAll();
        return res ?? [];
    } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Failed to load audits list';
        return rejectWithValue(msg);
    }
});

export const fetchAuditById = createAsyncThunk('roles/fetchAuditById', async (id, { rejectWithValue }) => {
    try {
        const res = await auditApi.getById(id);
        return res ?? null;
    } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Failed to load audit';
        return rejectWithValue(msg);
    }
});

const initialState = {
    compliance: {
        list: [],
        loading: false,
        error: null,
        selected: null,
    },
    audits: {
        list: [],
        loading: false,
        error: null,
        selected: null,
    },
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        clearComplianceSelected(state) { state.compliance.selected = null; },
        clearAuditsSelected(state) { state.audits.selected = null; },
    },
    extraReducers: (builder) => {
        // Compliance list
        builder.addCase(fetchComplianceList.pending, (state) => { state.compliance.loading = true; state.compliance.error = null; });
        builder.addCase(fetchComplianceList.fulfilled, (state, action) => { state.compliance.loading = false; state.compliance.list = action.payload; });
        builder.addCase(fetchComplianceList.rejected, (state, action) => { state.compliance.loading = false; state.compliance.error = action.payload || action.error.message; });

        // Compliance by id
        builder.addCase(fetchComplianceById.pending, (state) => { state.compliance.loading = true; state.compliance.error = null; state.compliance.selected = null; });
        builder.addCase(fetchComplianceById.fulfilled, (state, action) => { state.compliance.loading = false; state.compliance.selected = action.payload; });
        builder.addCase(fetchComplianceById.rejected, (state, action) => { state.compliance.loading = false; state.compliance.error = action.payload || action.error.message; state.compliance.selected = null; });

        // Audits list
        builder.addCase(fetchAuditsList.pending, (state) => { state.audits.loading = true; state.audits.error = null; });
        builder.addCase(fetchAuditsList.fulfilled, (state, action) => { state.audits.loading = false; state.audits.list = action.payload; });
        builder.addCase(fetchAuditsList.rejected, (state, action) => { state.audits.loading = false; state.audits.error = action.payload || action.error.message; });

        // Audit by id
        builder.addCase(fetchAuditById.pending, (state) => { state.audits.loading = true; state.audits.error = null; state.audits.selected = null; });
        builder.addCase(fetchAuditById.fulfilled, (state, action) => { state.audits.loading = false; state.audits.selected = action.payload; });
        builder.addCase(fetchAuditById.rejected, (state, action) => { state.audits.loading = false; state.audits.error = action.payload || action.error.message; state.audits.selected = null; });
    }
});

export const { clearComplianceSelected, clearAuditsSelected } = rolesSlice.actions;
export default rolesSlice.reducer;
