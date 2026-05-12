import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateAudit } from "../../../redux/auditSlice";
import { EmptyState, Loader, CharacterAllow ,useCharacterLimit ,useAudits} from "../../../core/registry";


const AuditEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [audit, setAudit] = useState(null);
  const [form, setForm] = useState({ status: "PENDING" });
  const [errors, setErrors] = useState({});

  const notesManager = useCharacterLimit("", 1000);

  const { selected, loading, error, loadById } = useAudits();

  useEffect(() => {
    if (id) loadById(id);
  }, [id]);

  useEffect(() => {
    if (selected) {
      setAudit(selected);
      setForm({ status: selected.status || "PENDING" });
      notesManager.setValue(selected.findings || "");
    } else if (error) {
      setAudit(null);
    }
  }, [selected, error]);

  const validate = () => {
    const err = {};
    if (!form.status) err.status = "Status required";
    if (notesManager.value.length > 1000)
      err.findings = "Max 1000 chars";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await dispatch(
        updateAudit({
          id,
          status: form.status,
          findings: notesManager.value,
        })
      ).unwrap();

      toast.success(
        res?.message ||
          (res?.auditId ? `Updated: ${res.auditId}` : "Updated")
      );

      navigate("/audit/list");
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  if (loading) return <Loader message="Loading..." />;

  if (!audit)
    return <EmptyState title="Not found" message="Audit not found" />;

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-body">
          <h5>Edit Audit #{audit.auditId}</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                className="form-select"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <textarea
              className="form-control"
              maxLength={1000}
              value={notesManager.value}
              onChange={notesManager.handleChange}
            />

            <CharacterAllow
              count={notesManager.count}
              limit={notesManager.limit}
            />

            <button className="btn btn-primary mt-2">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditEdit;