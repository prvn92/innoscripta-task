import { Issue, IssuePriority, IssueSeverity, IssueStatus } from '../types';

export function getAllIssues(): Issue[] {
  const issues: Issue[] = require('../data/issues.json');
  return issues;
}

export function searchIssues(
  text: string,
  pageSize: number = 25,
  offset: number = 0
): Issue[] {
  const issues: Issue[] = require('../data/issues.json');
  const filtered = issues.filter(issue => issue.title.toLowerCase().includes(text.toLowerCase()));
  return filtered.slice(offset, offset + pageSize);
}

export function filterIssues(
  filters: { assignee?: string; severity?: string },
  pageSize: number = 25,
  offset: number = 0
): Issue[] {
  const issues: Issue[] = require('../data/issues.json');
  let filtered = issues;
  if (filters.assignee) {
    filtered = filtered.filter(issue => issue.assignee === filters.assignee);
  }
  if (filters.severity) {
    filtered = filtered.filter(issue => String(issue.severity) === String(filters.severity));
  }
  return filtered.slice(offset, offset + pageSize);
}

export function getFilteredAndSortedIssues(
  issues: Issue[],
  search: string = '',
  assignee: string = '',
  severity: string = '',
  status?: IssueStatus,
  sortOptions: Partial<{ priority: IssuePriority; severity: IssueSeverity }> = {},
  pageSize: number = 25,
  offset: number = 0
): { issues: Issue[]; totalRecords: number } {
  let filtered = issues;
  if (search) {
    filtered = filtered.filter(issue => issue.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (assignee) {
    filtered = filtered.filter(issue => issue.assignee === assignee);
  }
  if (severity) {
    filtered = filtered.filter(issue => String(issue.severity) === String(severity));
  }
  if (status) {
    filtered = filtered.filter(issue => issue.status === status);
  }
  // Custom sort by priority score
  if (sortOptions.priority) {
    const priorityOrder: IssuePriority[] = ['Critical', 'High', 'Medium', 'Low'];
    filtered = filtered.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
  }
  if (sortOptions.severity) {
    const severityOrder: IssueSeverity[] = ['Critical', 'Major', 'Minor'];
    filtered = filtered.sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity));
  }
  const totalRecords = filtered.length;
  const paginated = filtered.slice(offset, offset + pageSize);
  return { issues: paginated, totalRecords };
}

export function getIssuesByIds(ids: string[]): Issue[] {
  const issues: Issue[] = require('../data/issues.json');
  return issues.filter(issue => ids.includes(issue.id));
}

export function getFilteredIssues(
  filters: { search?: string; assignee?: string; severity?: string },
  pageSize: number = 25,
  offset: number = 0,
  issues: Issue[]
): Issue[] {

  let filtered = issues;
  if (filters.search) {
    const searchText = String(filters.search).toLowerCase();
    filtered = filtered.filter(issue => issue.title.toLowerCase().includes(searchText));
  }
  if (filters.assignee) {
    filtered = filtered.filter(issue => issue.assignee === filters.assignee);
  }
  if (filters.severity) {
    filtered = filtered.filter(issue => String(issue.severity) === String(filters.severity));
  }
  return filtered.slice(offset, offset + pageSize);
}

export function getAssignees(): string[] {
  const issues: Issue[] = require('../data/issues.json');
  return Array.from(new Set(issues.map(issue => issue.assignee))).filter(Boolean);
}

export function getAbsoluteInsertIndex(
  status: IssueStatus,
  newIssues: Issue[],
  dragOverIndex: number | null
): number {
  const targetIndices = newIssues
    .map((issue, idx) => issue.status === status ? idx : -1)
    .filter(idx => idx !== -1);
  const insertIndex = dragOverIndex !== null ? dragOverIndex : targetIndices.length;
  return targetIndices.length === 0
    ? newIssues.length
    : (insertIndex < targetIndices.length
        ? targetIndices[insertIndex]
        : targetIndices[targetIndices.length - 1] + 1);
}
