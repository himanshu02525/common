import { useState } from 'react';
import * as api from '../api/reportApi';

export function useGenerateReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);

async function generateReportForScope(scope, extraParam,reportName) { 
  if (!scope) {
    throw new Error('generateReport requires a non-empty scope');
  }
  setIsGenerating(true);
  setGenerateError(null);
  try {
    const responsePayload = await api.generateReport(scope, extraParam, reportName); 
    setIsGenerating(false);
    return responsePayload;
  } catch (caughtError) {
    setGenerateError(caughtError);
    setIsGenerating(false);
    throw caughtError;
  }
}

  return { generate: generateReportForScope, isGenerating, generateError };
}

export default useGenerateReport;
