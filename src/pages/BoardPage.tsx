import React, { useState, useMemo } from 'react';
import { Issue, IssueStatus } from '../types';
import { IssueCard } from '../components/IssueCard';
import { IssueProvider, useIssueContext } from '../components/IssueContext';
import { getFilteredIssues } from '../utils/issueUtils';
import { IssueFilters } from '../components/IssueFilters';
import { RecentIssues } from '../components/RecentIssues';
import {
  boardColumnStyle,
  issueCardStyle,
  undoToastStyle,
  undoButtonStyle,
  paginationButtonStyle,
  boardContainerStyle,
  columnsWrapperStyle,
  sidebarStyle,
  paginationContainerStyle,
  pageLabelStyle,
  rootStyle
} from './BoardPage.styles';
import { useNavigate } from 'react-router-dom';

const STATUS_COLUMNS: IssueStatus[] = ['Backlog', 'In Progress', 'Done'];

export const BoardPage = () => {
  const {
    issues,
    recent,
    updateIssue,
    undo,
    onIssueClick,
  } = useIssueContext();
  const [search, setSearch] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [page, setPage] = useState(1);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const undoTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const PAGE_SIZE = 25;
  const assignees = Array.from(new Set(issues.map(issue => issue.assignee))).filter(Boolean);
  const offset = (page - 1) * PAGE_SIZE;
  const { issues: paginatedIssues, totalRecords } = useMemo(
    () => getFilteredIssues({ search, assignee: assigneeFilter, severity: severityFilter }, PAGE_SIZE, offset, issues),
    [search, assigneeFilter, severityFilter, PAGE_SIZE, offset, issues]
  );

  const showUndoToastWithTimeout = () => {
    setShowUndoToast(true);
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    undoTimeoutRef.current = setTimeout(() => {
      setShowUndoToast(false);
    }, 5000);
  };
  const onDrop = (status: IssueStatus) => {
    if (!draggedId) return;
    const draggedIndex = issues.findIndex(issue => issue.id === draggedId);
    if (draggedIndex === -1) return;
    const updatedIssue = { ...issues[draggedIndex], status, updatedAt: new Date().toISOString() };
    const newIssues = issues.map(issue => {
      if (issue.id === draggedId) {
        return updatedIssue;
      }
      return { ...issue };
    });
    updateIssue(newIssues);
    onIssueClick(draggedId);
    setDraggedId(null);
    setDragOverIndex(null);
    showUndoToastWithTimeout();
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
  };

  const handleFilter = (assignee: string, severity: string) => {
    setAssigneeFilter(assignee);
    setSeverityFilter(severity);
    setPage(1);
  };

  const handleIssueClick = (id: string) => {
    onIssueClick(id);
    navigate(`/issue/${id}`);
  };

  const handleUndo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    undo();
    setShowUndoToast(false);
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
  };

  const onDragStart = (id: string) => setDraggedId(id);
  const onDragOver = (_columnStatus: IssueStatus, index: number) => {
    setDragOverIndex(index);
  };
  const onDragEnd = () => {
    setDraggedId(null);
    setDragOverIndex(null);
  };

  return (
    <div style={rootStyle}>
      <h2>Issue Board</h2>
      <IssueFilters
        search={search}
        onSearchChange={handleSearch}
        assigneeFilter={assigneeFilter}
        onAssigneeChange={(val) => handleFilter(val, severityFilter)}
        severityFilter={severityFilter}
        onSeverityChange={(val) => handleFilter(assigneeFilter, val)}
        assignees={assignees}
      />
      {showUndoToast && (
        <div style={undoToastStyle}>
          Issue update: <button onClick={(e) => handleUndo(e)} style={undoButtonStyle}>Undo</button>
        </div>
      )}
      <div style={boardContainerStyle}>
        <div style={columnsWrapperStyle}>
          {STATUS_COLUMNS.map((status) => {
            const sorted = paginatedIssues.filter((issue: Issue) => issue.status === status);
            return (
              <div
                key={status}
                style={boardColumnStyle}
                onDragOver={(e) => {
                  e.preventDefault();
                  const index = Math.floor(
                    (e.nativeEvent.offsetY / e.currentTarget.offsetHeight) * sorted.length
                  );
                  onDragOver(status, index);
                }}
                onDrop={() => onDrop(status)}
              >
                <h3>{status}</h3>
                {sorted.map((issue: Issue, idx: number) => (
                  <div
                    key={issue.id}
                    draggable
                    onDragStart={() => onDragStart(issue.id)}
                    onDragEnd={onDragEnd}
                    onClick={() => handleIssueClick(issue.id)}
                    style={issueCardStyle(draggedId, dragOverIndex === idx ? issue.id : null, issue.id)}
                  >
                    <IssueCard
                      id={issue.id}
                      title={issue.title}
                      priority={issue.priority}
                      assignee={issue.assignee}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div style={sidebarStyle}>
          <RecentIssues recent={recent} />
        </div>
      </div>
      <div style={paginationContainerStyle}>
        <button
          style={paginationButtonStyle}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={pageLabelStyle}>Page {page}</span>
        <button
          style={paginationButtonStyle}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * PAGE_SIZE >= totalRecords}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function BoardPageWithProvider() {
  return (
    <IssueProvider>
      <BoardPage />
    </IssueProvider>
  );
}
