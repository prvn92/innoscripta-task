import React from 'react';
import { useParams } from 'react-router-dom';
import { useIssueContext } from '../components/IssueContext';
import { containerStyle, fieldStyle } from './IssueDetailPage.styles';

export const IssueDetailPage = () => {
  const { id } = useParams();
  const { issues } = useIssueContext();
  const issue = issues.find(i => i.id === id);

  if (!issue) {
    return <div style={{ padding: '1rem' }}>Issue not found.</div>;
  }

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
    </div>
  );
};
