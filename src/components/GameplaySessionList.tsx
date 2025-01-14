import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GameplaySession } from '../models/models';
import GameplaySessionItem from './GameplaySessionItem';

const GameplaySessionList: React.FC = () => {
  const [sessions, setSessions] = useState<GameplaySession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gameplay sessions from the API.
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('/api/recording/sessions');
        setSessions(response.data);
      } catch (err) {
        setError('Failed to fetch sessions.');
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <GameplaySessionItem key={session.id} session={session} />
      ))}
    </div>
  );
};

export default GameplaySessionList;