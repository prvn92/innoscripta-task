import React from 'react';
import { Link } from 'react-router-dom';
import { useIssueContext } from './IssueContext';

export const Navigation = () => {
    const { user } = useIssueContext();
    return (
        <nav style={{ padding: '1rem', background: '#eee', display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ flex: 1 }}>
                <Link to="/board" style={{ marginRight: '1rem' }}>Board</Link>
                <Link to="/settings">Settings</Link>
            </div>
            <span style={{ marginRight: 16 }}>Role: <strong>{user.role}</strong></span>
            <RoleToggle />
        </nav>
    );
};

const RoleToggle = () => {
    const { user } = useIssueContext();
    const [role, setRole] = React.useState(user.role);

    React.useEffect(() => {
        setRole(user.role);
    }, [user.role]);

    const handleToggle = () => {
        const newRole = role === 'admin' ? 'contributor' : 'admin';
        localStorage.setItem('userRole', newRole);
        window.location.reload();
    };

    return (
        <button onClick={handleToggle} style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', cursor: 'pointer' }}>
            Switch to {role === 'admin' ? 'Contributor' : 'Admin'}
        </button>
    );
};