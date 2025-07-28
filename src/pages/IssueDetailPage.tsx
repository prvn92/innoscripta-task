import React from 'react';
import { useParams } from 'react-router-dom';
import { useIssueContext } from '../components/IssueContext';
import { containerStyle, fieldStyle } from './IssueDetailPage.styles';
import { IssueStatus } from '../types';

export const IssueDetailPage = () => {
  const { id } = useParams();
  const { issues, updateIssue } = useIssueContext();
  const issue = issues.find(i => i.id === id);

  if (!issue) {
    return <div style={{ padding: '1rem' }}>Issue not found.</div>;
  }

  const handleMarkAsResolved = () => {
    if (issue.status === 'Done') return;
    const updatedIssues = issues.map(i =>
      i.id === issue.id ? { ...i, status: 'Done' as IssueStatus, updatedAt: new Date().toISOString() } : i
    );
    updateIssue(updatedIssues);
  };

  return (
    <div style={containerStyle}>
      <h2>Issue Details</h2>
      <div style={fieldStyle}><strong>ID:</strong> {issue.id}</div>
      <div style={fieldStyle}><strong>Title:</strong> {issue.title}</div>
      <div style={fieldStyle}><strong>Description:</strong> {issue.description || 'No description provided.'}</div>
      <div style={fieldStyle}><strong>Status:</strong> {issue.status}</div>
      <div style={fieldStyle}><strong>Assignee:</strong> {issue.assignee || 'Unassigned'}</div>
      <div style={fieldStyle}><strong>Priority:</strong> {issue.priority}</div>
      <div style={fieldStyle}><strong>Severity:</strong> {issue.severity}</div>
      <div style={fieldStyle}><strong>Created:</strong> {issue.createdAt || '-'}</div>
      <div style={fieldStyle}><strong>Updated:</strong> {issue.updatedAt || '-'}</div>
      {issue.status !== 'Done' && (
        <button onClick={handleMarkAsResolved} style={{ marginTop: 24, padding: '8px 20px', background: '#2ecc40', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>
          Mark as Resolved
        </button>
      )}
    </div>
  );
};
