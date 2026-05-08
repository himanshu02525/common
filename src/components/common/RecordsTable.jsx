import React, { useMemo, useState } from 'react';
import './RecordsTable.css';

const RecordsTable = ({
  columns = [],
  data = [],
  onSort = () => {},
  className = '',
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data || [];
    const sorted = [...(data || [])].sort((a, b) => {
      const va = sortConfig.key.split('.').reduce((o, k) => (o ? o[k] : undefined), a);
      const vb = sortConfig.key.split('.').reduce((o, k) => (o ? o[k] : undefined), b);
      if (va == null && vb == null) return 0;
      if (va == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (vb == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (!isNaN(Number(va)) && !isNaN(Number(vb))) {
        return sortConfig.direction === 'asc' ? Number(va) - Number(vb) : Number(vb) - Number(va);
      }
      const da = Date.parse(va);
      const db = Date.parse(vb);
      if (!isNaN(da) && !isNaN(db)) return sortConfig.direction === 'asc' ? da - db : db - da;
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return sortConfig.direction === 'asc' ? -1 : 1;
      if (sa > sb) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);
  const headerLabel = (col) => (
    <th
      onClick={() => {
        if (!col.sortable) return;
        setSortConfig((current) => {
          if (current.key === col.key) {
            const next = { key: col.key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
            onSort(next);
            return next;
          }
          const next = { key: col.key, direction: 'asc' };
          onSort(next);
          return next;
        });
      }}
      style={{ cursor: col.sortable ? 'pointer' : 'default' }}
      key={col.key || col.label}
    >
      {col.label}{col.sortable && sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ''}
    </th>
  );

  const renderCell = (col, row, rowIndex) => {
    const value = col.key ? row[col.key] : undefined;
    if (typeof col.render === 'function') return <td className={col.className || ''} key={col.key || rowIndex}>{col.render(value, row)}</td>;
    return <td className={col.className || ''} key={col.key || rowIndex}>{value}</td>;
  };

  return (
    <div className={`records-table table-responsive ${className}`}>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            {columns.map((c) => headerLabel(c))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={row.id || row.auditId || row.complianceId || idx}>
              {columns.map((c) => renderCell(c, row, idx))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
