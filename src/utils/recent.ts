const RECENT_KEY = 'recent_issues';

export function getRecentIssues(): string[] {
  const data = localStorage.getItem(RECENT_KEY);
  return data ? JSON.parse(data) : [];
}

export function addRecentIssue(id: string) {
  const recent = getRecentIssues();
  const updated = [id, ...recent.filter((i) => i !== id)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
}
