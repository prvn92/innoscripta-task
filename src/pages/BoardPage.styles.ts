import React from 'react';
import { IssueStatus } from '../types';

export const boardColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 250,
  paddingTop: 0,
  marginTop: 0,
  transition: 'background 0.3s',
};

export const issueCardStyle = (
  draggedId: string | null,
  draggedOverId: string | null,
  issueId: string
): React.CSSProperties => ({
  transition: 'transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s',
  transform:
    draggedId === issueId
      ? 'scale(1.05) translateY(-2px)'
      : draggedOverId === issueId
      ? 'scale(1.03) translateY(2px)'
      : 'scale(1)',
  boxShadow:
    draggedId === issueId
      ? '0 8px 24px rgba(44,62,80,0.15)'
      : draggedOverId === issueId
      ? '0 4px 12px rgba(44,62,80,0.10)'
      : '0 1px 4px rgba(44,62,80,0.05)',
  background: draggedId === issueId ? '#f9fafb' : '#fff',
  zIndex: draggedId === issueId ? 10 : 1,
});

export const undoToastStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 32,
  left: '50%',
  transform: 'translateX(-50%)',
  background: '#333',
  color: '#fff',
  padding: '12px 32px',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  zIndex: 1000,
};

export const undoButtonStyle: React.CSSProperties = {
  marginLeft: 16,
  color: '#fff',
  background: '#e74c3c',
  border: 'none',
  padding: '6px 16px',
  borderRadius: 4,
};

export const paginationButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: 16,
  borderRadius: 6,
  border: '1px solid #ccc',
  background: '#f7f7f7',
  cursor: 'pointer',
};
