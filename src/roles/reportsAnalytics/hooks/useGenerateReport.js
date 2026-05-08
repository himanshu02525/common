import { useState } from 'react';
import * as api from '../api/reportApi';

export function useGenerateReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate(scope) {
    setLoading(true);
    setError(null);
    try {
      const res = await api.generateReport(scope);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }

  return { generate, loading, error };
}

export default useGenerateReport;
