import React from 'react';
import { Issue } from '../types';

interface IssueModalProps {
  issue: Issue;
  onClose: () => void;
}

export const IssueModal: React.FC<IssueModalProps> = ({ issue, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      background: '#fff',
      borderRadius: 8,
      padding: 32,
      minWidth: 320,
      boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
      position: 'relative',
    }}>
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
      >
        ×
      </button>
      <div>
        <h2>{issue.title}</h2>
        <p>{issue.description}</p>
        <p>Priority: {issue.priority}</p>
        <p>Severity: {issue.severity}</p>
        <p>Assignee: {issue.assignee}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);
