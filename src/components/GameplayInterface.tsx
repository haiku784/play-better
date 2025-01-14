import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameplaySessionList from './GameplaySessionList';
import './GameplayInterface.css';

const GameplaySessionSelector: React.FC = () => {
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/sessions');
            setSessions(response.data);
        } catch (err) {
            setError('Failed to fetch gameplay sessions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    return (
        <div className="gameplay-session-selector">
            {loading && <p>Loading sessions...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && <GameplaySessionList sessions={sessions} />}
        </div>
    );
};

export default GameplaySessionSelector;