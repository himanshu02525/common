import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useGenerateReport from '../../hooks/useGenerateReport';
import {ScopeSelector} from '../../../../core/registry';

export default function CreateReportForm({ defaultScope = 'TAX', onSuccess }) {
  const [selectedScope, setSelectedScope] = useState(defaultScope);
  const { generate, isGenerating } = useGenerateReport();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const responsePayload = await generate(selectedScope);
      if (typeof onSuccess === 'function') onSuccess(responsePayload);
      toast.success('Report generated successfully');
    } catch (err) {
      toast.error('Failed to generate report: ' + (err.message || err));
    }
  }

  return (
    <form className="d-flex gap-2 align-items-center" onSubmit={handleSubmit}>
      <ScopeSelector value={selectedScope} onChange={setSelectedScope} />
      <button className="btn btn-primary btn-sm" type="submit" disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
}
