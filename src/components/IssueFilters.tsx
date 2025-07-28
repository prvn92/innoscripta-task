import React from 'react';

export const IssueFilters: React.FC<{
  search: string;
  onSearchChange: (text: string) => void;
  assigneeFilter: string;
  onAssigneeChange: (val: string) => void;
  severityFilter: string;
  onSeverityChange: (val: string) => void;
  assignees: string[];
}> = ({ search, onSearchChange, assigneeFilter, onAssigneeChange, severityFilter, onSeverityChange, assignees }) => (
  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
    <input
      type="text"
      placeholder="Search issues..."
      value={search}
      onChange={e => onSearchChange(e.target.value)}
      style={{ padding: '8px', borderRadius: 4, border: '1px solid #ccc', flex: 2 }}
    />
    <select value={assigneeFilter} onChange={e => onAssigneeChange(e.target.value)} style={{ padding: '8px', borderRadius: 4, border: '1px solid #ccc', flex: 1 }}>
      <option value="">All Assignees</option>
      {assignees.map(a => <option key={a} value={a}>{a}</option>)}
    </select>
    <input
      type="text"
      value={severityFilter}
      onChange={e => onSeverityChange(e.target.value)}
      placeholder="Filter by severity..."
      style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
    />
  </div>
);
