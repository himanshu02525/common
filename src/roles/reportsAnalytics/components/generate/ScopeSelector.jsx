import React from 'react';

export default function ScopeSelector({ value, onChange }) {
  const selectedScope = value;
  const onScopeChange = typeof onChange === 'function' ? onChange : () => {};

  return (
    <select className="form-select" value={selectedScope} onChange={(e) => onScopeChange(e.target.value)}>
      <option value="TAX">TAX</option>
      <option value="PROGRAM">PROGRAM</option>
      <option value="SUBSIDY">SUBSIDY</option>
    </select>
  );
}
