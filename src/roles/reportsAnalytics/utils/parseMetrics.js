export function parseMetrics(metricsString) {
  if (!metricsString) return {};
  try {
    // Some APIs may double-encode; attempt parse until it's an object
    let parsed = metricsString;
    if (typeof parsed !== 'string') return parsed;
    parsed = JSON.parse(parsed);
    // if nested string inside, try again for keys
    Object.keys(parsed).forEach((k) => {
      if (typeof parsed[k] === 'string') {
        try {
          parsed[k] = JSON.parse(parsed[k]);
        } catch (e) {
          // ignore
        }
      }
    });
    return parsed;
  } catch (e) {
    try {
      return JSON.parse(metricsString);
    } catch (err) {
      console.warn('Failed to parse metrics', e);
      return {};
    }
  }
}

export default parseMetrics;
