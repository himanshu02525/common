import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  EmptyState,
  RefetchButton,
  Loader,
  SearchBar,
  StatusBadge,
  RecordsTable,
} from "../../../core/registry";
import { fetchAudits } from "../../../redux/auditSlice";

const DisplayAllAudits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { audits, loading, error } = useSelector((state) => state.audit);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    dispatch(fetchAudits());
  }, [dispatch]);

  const displayedRecords = useMemo(() => {
    let filtered = audits || [];

    if (filterText.trim()) {
      const s = filterText.toLowerCase();

      filtered = filtered.filter((r) =>
        Object.values(r).some((v) =>
          String(v || "").toLowerCase().includes(s)
        )
      );
    }

    return filtered;
  }, [audits, filterText]);

  if (loading && audits.length === 0)
    return <Loader message="Loading audits..." />;

  return (
    <div>
      <div className="d-flex justify-content-end align-items-end mb-3">
        <RefetchButton onClick={() => dispatch(fetchAudits())} />
      </div>

      <SearchBar
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onClear={() => setFilterText("")}
        placeholder="Search audit records..."
      />

      {error && (
        <EmptyState
          title="Failed to load audits"
          message={String(error)}
        />
      )}

      {!error && (
        <RecordsTable
          data={displayedRecords}
          columns={[
            { label: "ID", key: "auditId", sortable: true },
            { label: "Officer Id", key: "officerId", sortable: true },
            { label: "Scope", key: "scope", sortable: true },
            {
              label: "Status",
              key: "status",
              sortable: true,
              render: (v) => <StatusBadge value={v} />,
            },
            {
              label: "Created",
              key: "createdAt",
              sortable: true,
              render: (v) =>
                v ? new Date(v).toLocaleString() : "",
            },
            {
              label: "Findings",
              key: "findings",
              render: (v) => (
                <div className="truncate-cell">{v}</div>
              ),
            },
            {
              label: "Actions",
              render: (_, row) => (
                <div className="action-td">
                  <button
                    className="btn btn-outline-info view-btn"
                    onClick={() =>
                      navigate(`/audit/${row.auditId}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-primary ms-2 edit-btn"
                    onClick={() =>
                      navigate(`/audit/${row.auditId}/edit`)
                    }
                  >
                    Edit
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default DisplayAllAudits;