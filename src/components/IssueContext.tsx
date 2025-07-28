import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue } from '../types';
import { getAllIssues } from '../utils/issueUtils';
import { IssueContextType } from '../types';
import { currentUser as importedCurrentUser } from '../constants/currentUser';

export interface User {
  name: string;
  role: 'admin' | 'contributor';
}

const getInitialRole = () => {
  const stored = localStorage.getItem('userRole');
  if (stored === 'admin' || stored === 'contributor') return stored;
  return importedCurrentUser.role;
};

const currentUser: User = {
  name: importedCurrentUser.name,
  role: getInitialRole() as 'admin' | 'contributor',
};

interface IssueContextWithUser extends IssueContextType {
  user: User;
}

const IssueContext = createContext<IssueContextWithUser>({
  recent: [],
  updateIssue: () => {},
  undo: () => {},
  onIssueClick: () => {},
  issues: [],
  fetchIssues: () => {},
  setIssues: () => {},
  setRecent: () => {},
  user: currentUser,
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
    <IssueContext.Provider value={{ recent, updateIssue, undo, onIssueClick, issues, fetchIssues, setIssues, setRecent, user: currentUser }}>
      {children}
    </IssueContext.Provider>
  );
}

export const useIssueContext = () => useContext(IssueContext);
