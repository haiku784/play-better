import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [gameplaySessions, setGameplaySessions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [integrations, setIntegrations] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    const response = await fetch('/users/');
    const data = await response.json();
    setUsers(data);
  };

  // Create user
  const createUser = async (user) => {
    await fetch('/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  };

  // Fetch a single user
  const fetchUserById = async (id) => {
    const response = await fetch(`/users/${id}/`);
    return await response.json();
  };

  // Update user
  const updateUser = async (id, user) => {
    await fetch(`/users/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  };

  // Patch user
  const patchUser = async (id, user) => {
    await fetch(`/users/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`/users/${id}/`, { method: 'DELETE' });
  };

  // Fetch gameplay sessions
  const fetchGameplaySessions = async () => {
    const response = await fetch('/gameplay_sessions/');
    const data = await response.json();
    setGameplaySessions(data);
  };

  // Create gameplay session
  const createGameplaySession = async (session) => {
    await fetch('/gameplay_sessions/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
  };

  // Fetch a single gameplay session
  const fetchGameplaySessionById = async (id) => {
    const response = await fetch(`/gameplay_sessions/${id}/`);
    return await response.json();
  };

  // Update gameplay session
  const updateGameplaySession = async (id, session) => {
    await fetch(`/gameplay_sessions/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
  };

  // Patch gameplay session
  const patchGameplaySession = async (id, session) => {
    await fetch(`/gameplay_sessions/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
  };

  // Delete gameplay session
  const deleteGameplaySession = async (id) => {
    await fetch(`/gameplay_sessions/${id}/`, { method: 'DELETE' });
  };

  // Analyze gameplay session
  const analyzeGameplaySession = async (sessionId) => {
    const response = await fetch(`/analyze/${sessionId}/`);
    return await response.json();
  };

  // Fetch hardware recommendations
  const fetchHardwareRecommendations = async () => {
    const response = await fetch('/hardware-recommendations');
    return await response.json();
  };

  // Fetch hardware recommendation by ID
  const fetchHardwareRecommendationById = async (id) => {
    const response = await fetch(`/hardware-recommendations/${id}`);
    return await response.json();
  };

  // Fetch config recommendations
  const fetchConfigRecommendations = async () => {
    const response = await fetch('/config-recommendations');
    return await response.json();
  };

  // Fetch config recommendation by game title
  const fetchConfigRecommendationByGameTitle = async (gameTitle) => {
    const response = await fetch(`/config-recommendations/${gameTitle}`);
    return await response.json();
  };

  // Fetch notifications by user ID
  const fetchNotificationsByUserId = async (userId) => {
    const response = await fetch(`/notifications?user_id=${userId}`);
    const data = await response.json();
    setNotifications(data);
  };

  // Create notification
  const createNotification = async (notification) => {
    await fetch('/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    });
  };

  // Update notification
  const updateNotification = async (id, notification) => {
    await fetch(`/notifications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    });
  };

  // Delete notification
  const deleteNotification = async (id) => {
    await fetch(`/notifications/${id}`, { method: 'DELETE' });
  };

  // Create integration
  const createIntegration = async (integration) => {
    await fetch('/integrations/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(integration),
    });
  };

  // Fetch integrations
  const fetchIntegrations = async () => {
    const response = await fetch('/integrations/');
    const data = await response.json();
    setIntegrations(data);
  };

  // Delete integration
  const deleteIntegration = async (platformId) => {
    await fetch(`/integrations/${platformId}/`, { method: 'DELETE' });
  };

  useEffect(() => {
    fetchUsers();
    fetchGameplaySessions();
    fetchIntegrations();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h1>Gameplay Sessions</h1>
      <pre>{JSON.stringify(gameplaySessions, null, 2)}</pre>
      <h1>Notifications</h1>
      <pre>{JSON.stringify(notifications, null, 2)}</pre>
      <h1>Integrations</h1>
      <pre>{JSON.stringify(integrations, null, 2)}</pre>
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserService from './components/UserService';
import RecordingService from './components/RecordingService';
import Analysis from './components/Analysis';
import RecommendationService from './components/RecommendationService';
import NotificationService from './components/NotificationService';
import IntegrationService from './components/IntegrationService';
import NotFound from './components/NotFound'; // A component to handle 404 errors

/**
 * App component serves as the main entry point for the application,
 * setting up routing for different services.
 */
const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>E-sports Performance Enhancement System</h1>
        <Switch>
          <Route exact path="/" component={UserService} />
          <Route path="/recording" component={RecordingService} />
          <Route path="/analysis" component={Analysis} />
          <Route path="/recommendations" component={RecommendationService} />
          <Route path="/notifications" component={NotificationService} />
          <Route path="/integrations" component={IntegrationService} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;