import React, { useEffect, useState } from 'react';

const GameplaySessionsList: React.FC = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true);
            const response = await fetch('/api/gameplay-sessions');
            const data = await response.json();
            setSessions(data);
            setLoading(false);
        };
        fetchSessions();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {sessions.map((session) => (
                <li key={session.id}>{session.title}</li>
            ))}
        </ul>
    );
};

export default GameplaySessionsList;
