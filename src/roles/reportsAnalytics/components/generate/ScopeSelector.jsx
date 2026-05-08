import React from 'react';

export default function ScopeSelector({ value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="TAX">TAX</option>
      <option value="PROGRAM">PROGRAM</option>
      <option value="SUBSIDY">SUBSIDY</option>
    </select>
  );
}
