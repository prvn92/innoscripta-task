import React from 'react';

export interface IssueCardProps {
  id: string;
  title: string;
  priority: string;
  assignee: string;
}

export const IssueCard: React.FC<IssueCardProps> = ({ id, title, priority, assignee }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: 6,
    padding: '12px 16px',
    marginBottom: 12,
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    cursor: 'pointer',
  }}>
    <div style={{ fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Priority: {priority}</div>
    <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Assignee: {assignee}</div>
  </div>
);
