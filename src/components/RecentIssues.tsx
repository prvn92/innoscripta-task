import React from 'react';
import { getIssuesByIds } from '../utils/issueUtils';
import { Issue } from '../types';

export const RecentIssues: React.FC<{ recent: string[] }> = ({ recent }) => {
  const issues = getIssuesByIds(recent);
  if (!issues.length) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <h4>Recently Accessed Issues</h4>
      <ul style={{ paddingLeft: 16 }}>
        {issues.map((issue: Issue) => (
          <li key={issue.id} style={{ marginBottom: 6 }}>
            {issue.title} (Priority: {issue.priority}, Assignee: {issue.assignee})
          </li>
        ))}
      </ul>
    </div>
  );
};
