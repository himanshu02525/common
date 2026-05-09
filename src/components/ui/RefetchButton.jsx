import React from 'react';
import {CachedIcon} from '../../core/registry';
export default function RefetchButton({ onClick, loading = false, title = 'Refresh' }) {
  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      className="btn btn-link btn-sm ms-2 p-0"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ) : (
        <CachedIcon />
      )}
    </button>
  );
}
