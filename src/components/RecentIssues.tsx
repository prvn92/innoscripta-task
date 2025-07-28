import React, { CSSProperties } from 'react';
import { getIssuesByIds } from '../utils/issueUtils';
import { Issue } from '../types';
import { IssueCard } from './IssueCard';
import { useIssueContext } from './IssueContext';

const containerStyle: CSSProperties = { marginTop: 32 };
const headerStyle: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const clearButtonStyle: CSSProperties = { background: 'none', border: 'none', color: '#888', fontSize: 18, cursor: 'pointer' };
const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column' as const, gap: 12 };
const cardStyle: CSSProperties = { boxShadow: '0 2px 8px #eee', borderRadius: 8, padding: 12, background: '#fff', cursor: 'pointer', position: 'relative' as const };
const removeButtonStyle: CSSProperties = { position: 'absolute' as const, top: 15, right: 15, background: 'none', border: 'none', color: '#aaa', fontSize: 16, cursor: 'pointer' };

export const RecentIssues: React.FC<{ recent: string[] }> = ({ recent }) => {
  const issues = getIssuesByIds(recent);
  const { setRecent } = useIssueContext();

  const handleRemove = (id: string) => {
    const updated = recent.filter(rid => rid !== id);
    setRecent(updated);
    localStorage.setItem('recentIssues', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setRecent([]);
    localStorage.removeItem('recentIssues');
  };

  if (!issues.length) return null;
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h4 style={{ margin: 0 }}>Recently Accessed Issues</h4>
        <button onClick={handleClearAll} style={clearButtonStyle} title="Clear All">✕</button>
      </div>
      <div style={listStyle}>
        {issues.map((issue: Issue) => (
          <div key={issue.id} style={cardStyle}>
            <button onClick={() => handleRemove(issue.id)} style={removeButtonStyle} title="Remove">✕</button>
            <IssueCard
              id={issue.id}
              title={issue.title}
              priority={issue.priority}
              assignee={issue.assignee}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
