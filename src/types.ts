export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';

export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type IssueSeverity = 'Minor' | 'Major' | 'Critical';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueContextType {
  recent: string[];
  updateIssue: ( newIssues: Issue[]) => void;
  undo: () => void;
  onIssueClick: (id: string) => void;
  issues: Issue[];
  fetchIssues: () => void;
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}
