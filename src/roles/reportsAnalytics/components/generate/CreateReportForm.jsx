import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useGenerateReport from '../../hooks/useGenerateReport';
import ScopeSelector from './ScopeSelector';

export default function CreateReportForm({ defaultScope = 'TAX', onSuccess }) {
  const [scope, setScope] = useState(defaultScope);
  const { generate, loading } = useGenerateReport();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await generate(scope);
      if (onSuccess) onSuccess(res);
      toast.success('Report generated successfully');
    } catch (err) {
      toast.error('Failed to generate report: ' + (err.message || err));
    }
  }

  return (
    <form className="d-flex gap-2 align-items-center" onSubmit={handleSubmit}>
      <ScopeSelector value={scope} onChange={setScope} />
      <button className="btn btn-primary btn-sm" type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
}
