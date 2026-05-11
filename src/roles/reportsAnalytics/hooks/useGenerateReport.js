import { useState } from 'react';
import * as api from '../api/reportApi';

export function useGenerateReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);

  async function generateReportForScope(scope, year, programId, reportName) {
  if (!scope) throw new Error('Scope required');

  setIsGenerating(true);
  setGenerateError(null);

  try {
    const response = await api.generateReport(scope, year, programId, reportName);
    return response;
  } catch (err) {
    setGenerateError(err);
    throw err;
  } finally {
    setIsGenerating(false);
  }
}

  return { generate: generateReportForScope, isGenerating, generateError };
}

export default useGenerateReport;