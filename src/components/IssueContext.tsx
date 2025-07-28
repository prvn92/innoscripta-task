import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue } from '../types';
import { getAllIssues } from '../utils/issueUtils';
import { IssueContextType } from '../types';

const IssueContext = createContext<IssueContextType>({
  recent: [],
  updateIssue: () => {},
  undo: () => {},
  onIssueClick: () => {},
  issues: [],
  fetchIssues: () => {},
  setIssues: () => {},
  setRecent: () => {},
});

export function IssueProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [oldIssues, setOldIssues] = useState<Issue[] | null>(null);

  useEffect(() => {
    const initialIssues = getAllIssues();
    setIssues(initialIssues);
    const storedRecent = localStorage.getItem('recentIssues');
    if (storedRecent) {
      setRecent(JSON.parse(storedRecent));
    }
  }, []);

  const updateIssue = ( newIssues?: Issue[]) => {
    setOldIssues(issues);
    setIssues([...(newIssues || [])]);
  };

  const undo = () => {
    if (oldIssues) {
      setIssues(oldIssues);
      setOldIssues(null); 
    }
  };

  const onIssueClick = (id: string) => {
    const updatedRecent = [id, ...recent.filter(rid => rid !== id)].slice(0, 5);
    setRecent(updatedRecent);
    localStorage.setItem('recentIssues', JSON.stringify(updatedRecent));
  };

  const fetchIssues = () => {
    setIssues(getAllIssues());
  };

  return (
    <IssueContext.Provider value={{ recent, updateIssue, undo, onIssueClick, issues, fetchIssues, setIssues, setRecent }}>
      {children}
    </IssueContext.Provider>
  );
}

export const useIssueContext = () => useContext(IssueContext);
