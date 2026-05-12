import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuditSummary } from "../../../redux/auditSlice";

const AuditSummary = () => {
  const dispatch = useDispatch();

  const { summary, loading } = useSelector((state) => state.audit);

  useEffect(() => {
    dispatch(getAuditSummary());
  }, [dispatch]);

  return (
    <div className="row mb-4">
      <div className="col-sm-3">
        <div className="card p-3">
          <h6>All</h6>
          <h4>{summary?.All || 0}</h4>
        </div>
      </div>

      <div className="col-sm-3">
        <div className="card p-3">
          <h6>Pending</h6>
          <h4>{summary?.PENDING || 0}</h4>
        </div>
      </div>

      <div className="col-sm-3">
        <div className="card p-3">
          <h6>In Progress</h6>
          <h4>{summary?.IN_PROGRESS || 0}</h4>
        </div>
      </div>

      <div className="col-sm-3">
        <div className="card p-3">
          <h6>Completed</h6>
          <h4>{summary?.COMPLETED || 0}</h4>
        </div>
      </div>
    </div>
  );
};

export default AuditSummary;
``