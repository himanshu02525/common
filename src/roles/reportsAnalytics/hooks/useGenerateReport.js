import { useState } from 'react';
import {generateReport}  from '../../../axios/reportsAnalyticsApi';

export function useGenerateReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);

  async function generateReport(scope, year, programId, reportName) {
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

  return { generate: generateReport, isGenerating, generateError };
}

export default useGenerateReport;